---
id: version-1.0.0-dataframe-schemas
title: DataFrame Schemas
original_id: dataframe-schemas
---

Below you can find all of the DataFrame schemas available in the Toolkit. For
example, you can use `.all()` to extract the overall content from a web archive
record. Some of the most popular ones include `.all()` (which includes raw
content (HTTP headers & HTML), URLs, and file types); `.webpages()` (which
includes full-text content and language); and `.webgraph()` which includes
hyperlink information.

## All

**`.all()`**

- `crawl_date` (string)
- `domain` (string)
- `url` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `raw_content` (string)
- `bytes` (binary)
- `http_status_code` (string)
- `archive_filename` (string)

## Web Pages

**`.webpages()`**

- `crawl_date` (string)
- `domain` (string)
- `url` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `language` (string)
- `content`

## Web Graph

**`.webgraph()`**

- `crawl_date` (string)
- `src` (string)
- `dest` (string)
- `anchor` (string)

## Image Graph

**`.imagegraph()`**

- `crawl_date` (string)
- `src` (string)
- `image_url` (string)
- `alt_text` (string)

## Images

**`.images()`**

- `crawl_date` (string)
- `url` (string)
- `filename` (string)
- `extension` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `width` (string)
- `height` (string)
- `md5` (string)
- `sha1` (string)
- `bytes` (binary)

## PDFs

**`.pdfs()`**

- `crawl_date` (string)
- `url` (string)
- `filename` (string)
- `extension` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `md5` (string)
- `sha1` (string)
- `bytes` (binary)

## Audio

**`.audio()`**

- `crawl_date` (string)
- `url` (string)
- `filename` (string)
- `extension` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `md5` (string)
- `sha1` (string)
- `bytes` (binary)

## Videos

**`.videos()`**

- `crawl_date` (string)
- `url` (string)
- `filename` (string)
- `extension` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `md5` (string)
- `sha1` (string)
- `bytes` (binary)

## Spreadsheets

**`.spreadsheets()`**

- `crawl_date` (string)
- `url` (string)
- `filename` (string)
- `extension` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `md5` (string)
- `sha1` (string)
- `bytes` (binary)

## Presentation Program Files

**`.presentationProgramFiles()`**

- `crawl_date` (string)
- `url` (string)
- `filename` (string)
- `extension` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `md5` (string)
- `sha1` (string)
- `bytes` (binary)

## Word Processor Files

**`.wordProcessorFiles()`**

- `crawl_date` (string)
- `url` (string)
- `filename` (string)
- `extension` (string)
- `mime_type_web_server` (string)
- `mime_type_tika` (string)
- `md5` (string)
- `sha1` (string)
- `bytes` (binary)
