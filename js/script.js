{
  ('use strict');

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
    console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  // //---MY OWN SOLUTION---
  // const generateTitleLinks = function () {
  //   // remove content of ul located in left sidebar,
  //   const ulContent = document.querySelector('.sidebar .titles');
  //   ulContent.innerHTML = '';
  //   // for each article
  //   const articleList = document.querySelectorAll('.post');
  //   for (let article of articleList) {
  //     // find article's id
  //     const articleId = article.getAttribute('id');
  //     // find article's title
  //     const articleTitle = article.querySelector('.post-title').innerHTML;
  //     // create link's HTML code
  //     const linkCode = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
  //     // insert link to ul located in left sidebar
  //     ulContent.innerHTML += linkCode;
  //   }
  //   const links = document.querySelectorAll('.titles a');
  //   console.log(links);
  //   for (let link of links) {
  //     link.addEventListener('click', titleClickHandler);
  //   }
  // };

  // generateTitleLinks();
  // //---MY OWN SOLUTION---

  //---KODILLA SOLUTION---
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

  const generateTitleLinks = function () {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* create HTML of the link */
      const linkHTML =
        '<li><a href="#' +
        articleId +
        '"><span>' +
        articleTitle +
        '</span></a></li>';
      console.log(linkHTML);
      /* insert link into titleList */
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const generateTags = function () {
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find tags wrapper */
      const wrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        /* generate HTML of the link */
        const link = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        /* add generated code to html variable */
        html += `${link} `;
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
  };

  generateTags();
}
