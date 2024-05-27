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

## Scope of context

1. The user will own many articles.
2. The job of the context is to show the user some information before they start reading the current article.
3. So, the question to be answered is, what would the user like to know
   1. Have I read something similar before?
   2. How does this relate to the artciles that I have read before.
   3. Do I remember what I read before?
4. Problem: What happens if we generate a context, and the user moves to a different article. Reads that article, and then comes back to the previous article.
   1. This will make the context stale.
   2. But how do we know if we need to generate a new context?
   3. A brute force solution will be to generate the context everytime the user opens the article.
   4. But this will fetch embeddings, do an LLm call, and generate context, even when the there has been no change to the user reading list.
   5. So we need to find a way where the system checks if the state of the user reading list has changed, and of those changes are relevant, and then generate the context, when the user visits the article again.
   6. What could be the ways in which we detect changes in the reading list?

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
      1. Phase 1
         1. Fetch all read articles and show the context.
            1. Set the reading progress of the article in the readingProgress row in the postgres database.
               1. The row should be of type - float, and the percentage of the article read should be saved.
            2. To check if the article has been read, notStarted, started, completed.
               1. If the percentage is 0, then notStarted.
               2. If the percentage is between 0 and 100, then started.
               3. If the percentage is 100, then completed.
            3. Filter condition: `readingProgress === 1`
         2. Finding relevant chunks
            1. Generate chunks of the current article.
            2. Fetch similar chunks for all the chunks of the current article.
            3. Find the top-k chunks that are similar to the current article.
      2. Expected Problems
         1. Context generation in non-linear reading
            1. User jumps from one article to another.
         2. Geometric increase in computation
            1. As the number of articles increases, the number of chunks increases.
            2. The number of chunks to be compared increases.
   7. Generating Context 1. Send the top-k chunks to the language model. 2. Generate the context using the language model.
   8. Show the context to the user.

   ## Questions

   9. How do we know which articles to perform the search on for context.

   ## Phase two

   10. Create a highlight saving mechanism.
   11. Embed the highlights, on save, after a short delay to avoid mistakes.
   12. Fetch the relevant highlights, and use it to generate the context, now enhanced with the highlights.
   13. Show the context to the user, along with the articles and highlights.

# Go to continue ''flow'' feature. [Flow](flow.md)
