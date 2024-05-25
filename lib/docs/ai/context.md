# Context Layer

## Embedding the Highlights

1. Save the highlights to the postgres database.
2. Embed the hightlights with openai.
3. Save the embeddings in the qdrant vector database with the relevant metadata.
   1. Highlight Id

## Embedding Articles

1. Save the articles to the postgres database.
2. Split the articles into chunks.
3. Connect metadata to the chunks.
4. Embed the chunks with openai.
5. Save the embeddings in the qdrant vector database with the relevant metadata.
   1. Article Id
   2. Chunk Id

## Fetching the Context

1. Fetch the ids of all the articles and highlights that the user has access to.
2. Fetch the embeddings of the articles and highlights.
3. Find the similarity between
   1. Current Articles and
   2. Past Articles and Highlights.
4. Rank the search results, maybe used rerank.
5. Send the relevant chunks to language model and contruct the context.
6. Show the context to the user, along with articles, and highlights.

## User Journey

1. User highlights the text on different articles.
2. When a user adds a new article
   1. The AI will look at the embeddings of the past highlights.
   2. The AI will summarize the prior knowledge of the user.
   3. The AI will fetch the related articles of the users.
3. On the reader page, the AI will show the context to the user.
   1. The AI will show the prior knowledge of the user.
   2. The AI will show the related articles of the user.

## Specs

1. Embeddings model: OpenAI
2. Vector Database: Qdrant
3. LLM: LLama3 hosted on groq
4. Framework: Langchain
5. Postgres: Metadata

## Questions

1. Do chunks get saved in the postgres database?
   Ans: No
2. Do highlights get saved in the postgres database?
   Ans: Yes
3. How do we chunk?
   Ans: Initially, by paragraphs, later we can do more semantic chunking.

   ## Phase one

   1. Save dummy articles in the postgres database using the seed data.
   2. Chunk one article
   3. Embed the chunks
   4. Save the embeddings in the qdrant vector database with the relevant metadata.
   5. Perform access control on the articles before fetching the context.
   6. Fetch the relevant chunks.
   7. Generate the context using the language model.
   8. Show the context to the user.

   ## Phase two

   1. Create a highlight saving mechanism.
   2. Embed the highlights, on save, after a short delay to avoid mistakes.
   3. Fetch the relevant highlights, and use it to generate the context, now enhanced with the highlights.
   4. Show the context to the user, along with the articles and highlights.

# Go to continue ''flow'' feature. [Flow](flow.md)
