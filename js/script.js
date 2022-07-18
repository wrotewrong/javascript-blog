{
  ('use strict');

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    // console.log('Link was clicked!');
    // console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    // console.log('clickedElement:', clickedElement);
    // console.log('clickedElement (with plus): ' + clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    // console.log(articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    // console.log(targetArticle);

    /* [DONE] add class 'active' to the correct article */

    targetArticle.classList.add('active');
  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.list.authors',
    optArticleAuthorSelector = '.post-author';

  const generateTitleLinks = function (customSelector = '') {
    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(
      optArticleSelector + customSelector
    );
    let html = '';
    for (let article of articles) {
      /* get the article id */
      const articleId = article.getAttribute('id');
      /* find the title element */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      /* create HTML of the link */
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
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

  // MY SOLUTION
  // const calculateTagsParams = function (tags) {
  //   const values = [];
  //   for (let tag in tags) {
  //     values.push(tags[tag]);
  //   }
  //   return {
  //     max: Math.max(...values),
  //     min: Math.min(...values),
  //   };
  // };

  // KODILLA SOLUTION
  const calculateTagsParams = function (tags) {
    const params = { max: 0, min: 999999 };
    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
    }
    return params;
  };

  const calculateTagClass = function (count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function () {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};
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
        const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        /* add generated code to html variable */
        html += linkHTML;
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* insert HTML of all the links into the tags wrapper */
      wrapper.innerHTML = html;
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);
    /* [NEW] create variable for all links HTML code */
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      // allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      allTagsHTML += `<li><a class="${calculateTagClass(
        allTags[tag],
        tagsParams
      )}" href="#tag-${tag}">${tag}</a><span></span></li>`;
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
    console.log(allTags);
  };

  generateTags();

  const tagClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);
    /* find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeLinks);
    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks) {
      /* remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active tag link */
      console.log(activeLink);
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const allLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log(allLinks);
    /* START LOOP: for each found tag link */
    for (let link of allLinks) {
      /* add class active */
      link.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-tags~="${tag}"]`);
  };

  const addClickListenersToTags = function () {
    /* find all links to tags */
    const links = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function () {
    /* [NEW] create a new variable allAuthors with an empty object */
    const allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* find author wrapper */
      const wrapper = article.querySelector(optArticleAuthorSelector);
      /* get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* generate HTML of the link */
      const html = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
      /* insert HTML into the author wrapper */
      wrapper.innerHTML = html;
      /* [NEW] check if this author is NOT already in allAuthors */
      if (!allAuthors[articleAuthor]) {
        /* [NEW] add author to allAuthors object */
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* END LOOP: for every article: */
    }
    /* [NEW] find list of authors in right column */
    const authorsList = document.querySelector(optAuthorsListSelector);
    /* [NEW] create variable for all links HTML code */
    let allAuthorsHTML = '';
    /* [NEW] START LOOP: for each author in allTags: */
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allAuthorsHTML */
      allAuthorsHTML += `<li><a href="#author-${author}">${author}</a><span> (${allAuthors[author]})</span></li>`;
      /* [NEW] END LOOP: for each author in allTags: */
    }
    /*[NEW] add HTML from allAuthorsHTML to authorsList */
    authorsList.innerHTML = allAuthorsHTML;
  };

  generateAuthors();

  const authorClickHandler = function (event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);
    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author-', '');
    console.log(author);
    /* find all author links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
    console.log(activeLinks);
    /* START LOOP: for each active author link */
    for (let activeLink of activeLinks) {
      /* remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active author link */
      console.log(activeLink);
    }
    /* find all author links with "href" attribute equal to the "href" constant */
    const allLinks = document.querySelectorAll(`a[href="${href}"]`);
    console.log(allLinks);
    /* START LOOP: for each found author link */
    for (let link of allLinks) {
      /* add class active */
      link.classList.add('active');
      /* END LOOP: for each found author link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks(`[data-author="${author}"]`);
  };

  const addClickListenersToAuthors = function () {
    /* find all links to authors */
    const links = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for (let link of links) {
      /* add authorClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  };
  addClickListenersToAuthors();
}
