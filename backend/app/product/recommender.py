import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from core.models import Product
from django.db.models import Case, When

def get_content_based_recommendation(product_id, top_n=8):
    products = Product.objects.all().values('id', 'name', 'description', 'category__name')
    df = pd.DataFrame(products)

    if df.empty or product_id not in df['id'].values:
        return Product.objects.none()

    try:
        idx = df.index[df['id'] == product_id][0]
    except IndexError:
        return Product.objects.none()

    target_category = df.loc[idx, 'category__name']

    # Construct weighted text
    df['text'] = (
        df['name'].fillna('') + ' ' +
        df['description'].fillna('') + ' ' +
        (df['category__name'].fillna('') + ' ') * 3
    ).str.lower()

    tfidf = TfidfVectorizer(stop_words='english', ngram_range=(1, 2))
    tfidf_matrix = tfidf.fit_transform(df['text'])
    cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

    all_scores = [(i, score) for i, score in enumerate(cosine_sim[idx]) if df['id'][i] != product_id]
    all_scores = sorted(all_scores, key=lambda x: x[1], reverse=True)

    # First, get same-category recommendations
    same_cat_scores = [pair for pair in all_scores if df.loc[pair[0], 'category__name'] == target_category]
    selected = same_cat_scores[:top_n]

    # Fill the rest with top results from other categories if needed
    if len(selected) < top_n:
        used_indices = {i[0] for i in selected}
        remaining = [pair for pair in all_scores if pair[0] not in used_indices]
        selected += remaining[:top_n - len(selected)]

    product_indices = [i[0] for i in selected]
    recommended_ids = df['id'].iloc[product_indices].tolist()

    preserved_order = Case(*[When(id=pk, then=pos) for pos, pk in enumerate(recommended_ids)])
    return Product.objects.filter(id__in=recommended_ids).order_by(preserved_order)