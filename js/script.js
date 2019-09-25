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
    optArticleTagsSelector = '.post-tags .list';

  function generateTitleLinks() {
    const titleList = document.querySelector(optTitleListSelector);
    /* remove contents of titleList */
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
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
        html += `<li><a>${tag}</a></li> `;
        /* add generated code to html variable */
        /* END LOOP: for each tag */
      }
      console.log(wrapper);
      /* insert HTML of all the links into the tags wrapper */
      wrapper.insertAdjacentHTML('beforeend', html);
      /* END LOOP: for every article: */
    }
  }

  generateTags();
  generateTitleLinks();
}
