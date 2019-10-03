{
  ('use strict');

  const templates = {
    articleLink: Handlebars.compile(
      document.querySelector('#template-article-link').innerHTML
    ),
    tagLink: Handlebars.compile(
      document.querySelector('#template-tag-link').innerHTML
    ),
    authorLink: Handlebars.compile(
      document.querySelector('#template-author-link').innerHTML
    ),
    tagCloudLink: Handlebars.compile(
      document.querySelector('#template-tag-cloud-link').innerHTML
    ),
    authorsListLink: Handlebars.compile(
      document.querySelector('#template-authors-list-link').innerHTML
    )
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorsSelector = '.post-author',
    optCloudClassCount = 5;

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    clickedElement.classList.add('active');
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    const href = clickedElement.getAttribute('href');
    const article = document.querySelector(href);
    article.classList.add('active');
  };

  function generateTitleLinks(customSelector = '') {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);
      titleList.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return classNumber;
  }

  function generateTags() {
    const articles = document.querySelectorAll('article');

    for (let article of articles) {
      const wrapper = article.querySelector(optArticleTagsSelector);
      const tags = article.getAttribute('data-tags').split(' ');
      // console.log(tags);
      for (let tag of tags) {
        const tagData = {
          tag: tag
        };
        const tagHTML = templates.tagLink(tagData);
        //console.log(tagHTML);
        wrapper.insertAdjacentHTML('beforeend', tagHTML);
      }
    }
  }

  function generateAuthors() {
    const articles = document.querySelectorAll('article');
    for (let article of articles) {
      const wrapper = article.querySelector(optArticleAuthorsSelector);
      const author = article.getAttribute('data-author');
      const authorHTMLData = { author: author };
      const authorHTML = templates.authorLink(authorHTMLData);
      wrapper.insertAdjacentHTML('beforeend', authorHTML);
    }
  }

  function tagClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const tag = href.substr(5);
    const linksWithActiveClass = document.querySelectorAll(`a.active`);
    for (let link of linksWithActiveClass) {
      link.classList.remove('active');
    }
    const links = document.querySelectorAll(`a[href^="#tag-${tag}"]`);
    for (let link of links) {
      link.classList.add('active');
    }
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    const links = document.querySelectorAll('a[href^="#tag-"]');
    for (let link of links) {
      link.addEventListener('click', tagClickHandler);
    }
  }

  function authorClickHandler(event) {
    event.preventDefault();
    const clickedElement = this;
    const href = clickedElement.getAttribute('href');
    const author = href.substr(8);
    const linksWithActiveClass = document.querySelectorAll(`a.active`);
    for (let link of linksWithActiveClass) {
      link.classList.remove('active');
    }
    const links = document.querySelectorAll(`a[href^="#tag-${author}"]`);
    for (let link of links) {
      link.classList.add('active');
    }
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    const links = document.querySelectorAll('a[href^="#author-"]');
    for (let link of links) {
      link.addEventListener('click', authorClickHandler);
    }
  }

  function calcualteTagsParams(tags) {
    const params = {
      min: 100,
      max: 0
    };
    for (let tag in tags) {
      if (tags[tag] < params.min) params.min = tags[tag];
      else if (tags[tag] > params.max) params.max = tags[tag];
    }

    return params;
  }

  function generateTagsList() {
    let allTags = {};
    const allTagsData = { tags: [] };
    const articles = document.querySelectorAll('article');
    for (let article of articles) {
      const tags = article.getAttribute('data-tags').split(' ');
      for (let tag of tags) {
        if (!allTags.hasOwnProperty(tag)) {
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
    }
    const tagsParams = calcualteTagsParams(allTags);
    for (let tag in allTags) {
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }

    //console.log(tagsParams);
    const tagList = document.querySelector('.tags');
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
  }

  function generateAuthorsList() {
    let allAuthors = [];
    let uniqueAuthors = [];
    const articles = document.querySelectorAll('article');
    for (let article of articles) {
      const author = article.getAttribute('data-author');
      allAuthors.push(author);
      if (uniqueAuthors.indexOf(author) < 0) uniqueAuthors.push(author);
    }

    const authorsData = { authors: {} };
    allAuthors.forEach(function(i) {
      authorsData.authors[i] = (authorsData.authors[i] || 0) + 1;
    });
    console.log(authorsData);
    const authorsList = document.querySelector('.list.authors');
    const authorsListHTML = templates.authorsListLink(authorsData);
    authorsList.insertAdjacentHTML('beforeend', authorsListHTML);
  }

  generateTags();
  generateAuthors();
  generateTitleLinks();
  generateTagsList();
  generateAuthorsList();
  addClickListenersToTags();
  addClickListenersToAuthors();
}
