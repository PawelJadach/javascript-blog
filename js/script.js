{
  ('use strict');
  // document.getElementById("test-button").addEventListener("click", function() {
  //   const links = document.querySelectorAll(".titles a");
  //   console.log("links:", links);
  // });

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    //console.log("Link was clicked!");
    //console.log(event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    //   console.log("clickedElement (with plus): " + clickedElement);
    //   console.log("clickedElement:", clickedElement);
    //   console.log(clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const href = clickedElement.getAttribute('href');
    //   console.log(href);
    /* find the correct article using the selector (value of 'href' attribute) */
    const article = document.querySelector(href);
    //   console.log(article);
    /* add class 'active' to the correct article */
    article.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorsSelector = '.post-author';
  function generateTitleLinks(customSelector = '') {
    // console.log('custom selector = ' + customSelector);
    const titleList = document.querySelector(optTitleListSelector);
    /* remove contents of titleList */
    // console.log(`${optArticleTagsSelector}${customSelector}`);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element / get the title from the title elemen*/
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      /* insert link into titleList */
      titleList.insertAdjacentHTML('beforeend', linkHTML);
    }

    const links = document.querySelectorAll('.titles a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }

  function generateTags() {
    /* find all articles */
    const articles = document.querySelectorAll('article');

    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const wrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      /* split tags into array */
      const tags = article.getAttribute('data-tags').split(' ');
      /* START LOOP: for each tag */
      for (let tag of tags) {
        /* generate HTML of the link */
        html += `<li><a href="#tag-${tag}">${tag}</a></li> `;
        /* add generated code to html variable */
        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      wrapper.insertAdjacentHTML('beforeend', html);
      /* END LOOP: for every article: */
    }
  }

  function generateAuthors() {
    /* find all articles */
    const articles = document.querySelectorAll('article');
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const wrapper = article.querySelector(optArticleAuthorsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      /* split tags into array */
      const author = article.getAttribute('data-author');
      html = `by <a href="#author-${author}">${author}</a>`;
      wrapper.insertAdjacentHTML('beforeend', html);
      /* END LOOP: for every article: */
    }
  }

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    // console.log(event);
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.substr(5);
    /* find all tag links with class active */
    const linksWithActiveClass = document.querySelectorAll(`a.active`);
    /* START LOOP: for each active tag link */
    for (let link of linksWithActiveClass) {
      /* remove class active */
      link.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll(`a[href^="#tag-${tag}"]`);
    /* START LOOP: for each found tag link */
    for (let link of links) {
      link.classList.add('active');
    }
    /* add class active */
    /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
    }

    /* END LOOP: for each link */
  }

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
    const author = href.substr(8);
    /* find all tag links with class active */
    const linksWithActiveClass = document.querySelectorAll(`a.active`);
    /* START LOOP: for each active tag link */
    for (let link of linksWithActiveClass) {
      /* remove class active */
      link.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const links = document.querySelectorAll(`a[href^="#tag-${author}"]`);
    /* START LOOP: for each found tag link */
    for (let link of links) {
      link.classList.add('active');
    }
    /* add class active */
    /* END LOOP: for each found tag link */
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');
  }

  function addClickListenersToAuthors() {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#author-"]');

    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
    }

    /* END LOOP: for each link */
  }

  generateTags();
  generateAuthors();
  generateTitleLinks();
  addClickListenersToTags();
  addClickListenersToAuthors();
}
