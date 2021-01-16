# DOCUMENTATION: mongo_customer_inventory schema 

## What files are in this folder?
**LDA MODEL**
<br><code>experimental_nlp_product_type.ipynb</code> = small version
<br><code>experimental_nlp_timeseries.ipynb</code> = big version using >10 million points

**Results**
<br><code>./Images</code> = images
<br><code>./Images/lda_model_tfidf.html</code> = html file for PCA analysis of topics

**Shopify Inventory Table Analysis**
<br><code>inventory_level_logs_analysis.ipynb</code> = Inventory Level Logs table
<br><code>product_analysis.ipynb</code> = Products table

**Module for own Reusuable Code**
<br><code>frameup.py</code> = more code that I wrote

## Purpose
**PURPOSE STATEMENT:** To comment on the data integrity of the Shopify Inventory tables, and explore and analyze the trends within the data.

## Problems being Addressed
There are currently three tables within the schema:
  1. FIVETRAN_AUDIT
  2. INVENTORY_LEVEL_LOGS
  3. PRODUCTS
  
FIVETRAN_AUDIT is the least important table because it merely tracks the number of rows added to the other tables within the schema, for all-intensive purposes, such as analyzing the accuracy within the migration of the data to our database.

INVENTORY_LEVEL_LOGS - TO BE UPDATED

PRODUCTS is the main focus of this project. Because the products are not properly organized into categories/topics, the trends found for all products does give insight into how an individual industry is competing in the COVID era. Without the proper tags, no trends are necessarily useful. The main focus of the readme is about how certain models are able to create more meaningful data points that are able to draw these conclusions.

## FiveTran_Audit

**Useful Information:** Nothing

This table is completely clean; there is no null values, all values are in the correct format, and through random samplings, the values are meaningful. Again, as stated in the introduction of each table, the Fivetran_Deleted is not valuable in trend analysis because it tracks changes from Clearbanc's side of the data. That is to say, it merely tracks when Clearbanc or Fivetran uploads this data, and thus says nothing about the user specifically in terms of how they interact with their data on a daily basis. 

## Inventory_Level_Logs

**Useful Information:** location_id = categorical variable

Likewise, the Inventory_Level_Logs are extremely clean and primed for data analysis.

Most features are unique and are used solely for tracking purposes. The graphql id, the unique inventory log id, and similar columns are uninteresting, as only one is truly needed to track unique inventory product users. In terms of analysis, only the updated_at and one columns of unique ids is necessary to draw a conclusion about the data. However, there is one important categorical variable: location_id. This is different than the typical format of an online, automatically generated id for the aforementioned columns. This tracks where the user is useful for understanding geographical trends. An example conclusion may include identifying geographical areas in which products are resupplied during certain periods. What that conclusion may say, is beyond the prediction level of this ticket.

## Products
Similar to the previous tables, it can be conclusively said that the products table is absolutely clean and has meaningful data. The one caveat is the product type columns. Although the type provides meaningful information, as in the products are being correctly identified based on the input-er's criteria, the product types are too unique but not "truly" unique; that is to say what differs between tags is sometimes a space or an extra word.

```
["Men,Men's Clothing,Men's_Shirts,Men,Clothing,All,Shirt,Top,trendyol.com,Flash_Sale"]
["Men,Men's Shoes,Men's_Slippers,Men,All,Shoes,Slippers,trendyol.com"]
["Women,Women's Clothing,Women's_Fashion hoodies & Sweaters,Women,Clothing,All,Tops,Sweater,trendyol.com"]
["Men,Men's Clothing,Men's_Pants,Men,Clothing,All,Pants,Bottom,trendyol.com"]
['Girls,Kids,Girls_Clothing Sets,Girls_Clothing,Kids,Clothing,All,Sets,Toddler,Girl,carters.com']
['Adult Short Sleeve']
['Pre-Order']
["Women's Tops + Tees > Crop Tops > Shirts"]
```

Below is a graph showing product type tag usuage:

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/ProductTagUsage.png">
</p>

The graph above shows that most tags are only used once. Currently, there are approximately 9 million unique product rows (this is based on the _id and id and the length of the entire table), and 70 thousand product tags. The most used tag is the null tag. The null tag has been applied to 800 thousand products. This shows that the product type alone is not a useful feature for understanding trends within an individual industry.

The following is some sample code on the product table statistics:
```
The number of meaningful uses defined in this analysis: 5
Meaningful uses: 30337
Not meaningful uses: 41701


Average = 4644.802132701422
More than Average: 249
Less than Average: 71789
```
I set the number of meaningful uses to an arbitrary 5 uses. This means that ~58% of the tags are not even used >= 5 times. Understandably, this makes the information unvaluable. The graph below shows trends for products added to the table over the years. This information is not necessarily useful:

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/ProductsByYearAndMonth.png">
</p>

Based on classical algorithms, there is no way to understand those small differences in wording. One classical method is Fuzzy Matching using regular expressions, which attempts to group similar worded documents. Unfortunately, it is based on the letters and grouping of letters, rather than words. This is an important distinction because there is inherent understanding between the linguistics of the words, such as the relationship between woman and girl. The solutions is a machine-learning technique with natural-language-processing.

## NLP Latent Dirichlet Allocation Notes

Link to Nart's work on the webscrapping LDA website classifier initiative: https://github.com/clearbanc/code/tree/c5b0123a1f124f9abfd7c12cc3855c2866122ff1/analytics/sandbox/2019_04_similarity_measure

### Introduction
The most classical examples of ml classifiers are the random forest and the naive bayes. These are supervised techniques that require training data that is conveniently already labelled. This is problematic because with the current data, those labels must be manually input for a valuable and large enough dataset. The gold standard for classifying 'documents' such as tweets, reddit posts, news headlines, and products is the latent dirichlet allocation model.

The LDA model "is a generative statistical model that allows sets of observations to be explained by unobserved groups that explain why some parts of the data are similar". It is an unsupervised model that creates relationships between documents.

Some keywords that may be relevant (mathematical words/concepts will be explained as the readme continues):
<br>**Corpus** - a collection of words
<br>**Lemmatize** - to group words based on the same flucations and variation in word structure
<br>**Stem** - to reduce a word to its root

### Data Preprocessing
Just as with any NLP technique, the documents must be split into a word vector, and each word must be lemmatized and stemmed. By reducing each word to its root, each document can be compared based on the occurrence of similar meaning words. The gensim and nltk libraries create these associations for you by applying the correct functions: 

```
original document: 
['Residential', 'Table']


 tokenized and lemmatized document: 
[residenti, tabl]
```

These sets of documents are converted into a dictionary of frequencies. This dictionary is converted into a Bag of Words, which is simply a NLP word retrieval model that makes sense to the model and allows efficient retrieval of words.

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/bag_of_words.png">
</p>

I put a list of references below; if you would like to learn more about this information model, please refer to it below.

The final step is an experimental one. I prepared the model with the regular Bag of Words, and with a TFIDF retrieval model. The tfidf is the more common model that you may recognize, which is another way of letting the LDA model understand the frequency of the word within the corpus.

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/0*7r2GKRepjh5Fl41r.png">
</p>

### Visualizing Topics
Below is a visual on a totally unsupervised LDA model. Each topic is visually displayed. The darker bar represents the weight of the word in the topic, which the fainter bar represents the wordcount within the set. A sampling of the first topic is displayed in words below as well for the reader's understanding of how each topic that the LDA model generates, is structured:

```
EXAMPLE
Topic: 0 Word: 0.041*"cover" + 0.030*"storag" + 0.030*"ball" + 0.022*"brush" + 0.019*"tray" + 0.018*"cabinet" + 0.017*"children" + 0.017*"camera" + 0.016*"lock" + 0.015*"skin"
```

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/WordCount2.png">
</p>

Generally, as Nart, a former Clearbanc employee who has worked on a similar LDA model, concluded, the topics are too abstract. The topics do not have a strong humanly understood value/grouping. As the hyperparameters are tuned, the categories are more defined.

Although the topics are not mutually exclusive and products are definitely placed into topics, this is may be more useful because it identifies what the model believes the product belongs to, in weights. It allows products to be grouped and may prove useful in the future using these scores.

### Optimizing Hyperparameters
There are two main mathematical scores for a LDA model. The first is perplexity, and the second is coherence.

**Perplexity** "is a measurement of how well a probability distribution or probability model predicts a sample". To put it simpler, it is the measure of how well a model 'fits' the dataset. With the tuned hyperparameter of <code>numtopics</code>, how well do those generated topics encompass all data points?

**Coherence** is a score of the data quality of each individual topic.

*<code>workers</code> = number of CPU/GPU cores used.*

**How to optimize:** By specificing the correct amount that your computer has, you can maximize the parallel computing power. Nart has already written some code that finds the number of cores that your computer has. I would assume that the model does not automatically optimize this parameter because there may be instances where the user may want to use fewer cores than the max.

```
import multiprocessing
num_cores = multiprocessing.cpu_count()
```

<code>numtopics</code> = number of topics that the LDA should have

**How to optimize:** By minimizing the perplexity and maximizing the coherence. Both Nart and I have created bits of code that help evaluate these measures. Please the read carefully to implement these solutions.

<code>chunksize</code> = the number of documents per pass

**How to optimize:** I believe that this an arbitrary and experimental paramter. Ultimately, you could pass all the documents at once, but obviously, this affects the quality of the model. Where the sweet spot is, is unfortunately up to experimental guess.

<code>passes</code> = the number of passes that the model goes through each corpus.

**How to optimize:** This number is actually arbitrary because as longs as the model converges with said number of passes, the number can be anything. The gensim and nltk kits actually display when the number of passes successfully converge. You will have to experiment/create the code to optimize this, because I have not:

```
2016-06-21 15:40:06,753 - gensim.models.ldamodel - DEBUG - 68/1566 documents converged within 400 iterations
```

The rest of the parameters are hopefully self-explanatory. Put the corpus and dictionary into the correct argument, and so forth. I hope you actually read the official documentation before implementing a model; the tuning and optimization above is information that is not necessarily clear in other articles and documentation that you find online.

### Training on a Larger Dataset - 10 MILLION DATA POINTS

Below is a pca visualization of the topics generated by the model. Please find the html in https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images:

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/lda.png">
</p>

I have chosen to display a few of the timeseries, separated by topic. Although the topics are not concretely separated, it is interesting to see the trends of those topics:

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic0Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic1Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic2Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic4Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic10Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic16Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic0Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic0Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic0Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic27Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic28Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/products_per_day_2019/Topic29Year2019.png">
</p>

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/2019VerticalProducts.png">
</p>

Below is the timeseries for the 2019 calender year for Topic 28 based on a multiplicative seasonal decomposition model:

<p align="center">
  <img src="https://github.com/clearbanc/code/blob/tommysuen/ch57561/exploratory-data-analysis-of-shopify-inventory/analytics/sandbox/2020_10_05_tommy_inventory_analysis/Images/Decomposed.png">
</p>

Perplexity Scores:

| Number of Topics  | Perplexity |
| ------------- | ------------- |
| 1  | -8.130534765852854  |
| 2  | -8.284189159235677  |
| 4  | -8.455203203615005 |
| 10  | -8.582997001872636 |
| 20  | -8.648856625330884 |
| 30  | -9.016319572635735 |

**List of References:**
<br>Tutorial: https://towardsdatascience.com/topic-modeling-and-latent-dirichlet-allocation-in-python-9bf156893c24
<br>Bag of Words: https://machinelearningmastery.com/gentle-introduction-bag-words-model/
<br>Optimizing Hyperparameters: https://markroxor.github.io/gensim/static/notebooks/lda_training_tips.html, https://miningthedetails.com/blog/python/lda/GensimLDA/

## Conclusions
I believe that the tables are of the highest quality; they are clean, they have no null values, and those values are in the correct format and are meaningful. Again, theres is the sole exception of the product type and corresponding tags, however, more meaning can be drawn about each product from these documents of keywords. The product type is being filled to the best ability of the customer, and there is no realistic way of mandating a standard for the product type, besides telling Shopify to organize their products better. The solution is the extensive documentation on the unsupervised LDA model technique. 

## Future Work
Because the integrity of the Shopify Inventory tables is of excellent quality, future work can incorporate the data in the tables without fear of garbage data points. This includes trend modelling, forecasting, or other probable data science techniques. 

In terms of the LDA classifier, future work could be done to better optimize the hyper parameters in the model. As of now, the downside remains the same as the conclusions drawn by Nart; the unsupervised technique generates widely abstract topics that may not have any human contextual meaning. 

## Authors
`Tommy Suen`, `Nart`

## Tags
<code>SANDBOX</code>, <code>RESEARCH</code>, <code>NON-PROD</code>
