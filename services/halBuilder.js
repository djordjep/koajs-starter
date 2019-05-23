module.exports = HALbuilder = async (model, url, { page, itemsPerPage }) => {

    const count = await model.count();
    console.log(count);
    const queryPart = /\?.*/gm;
    console.log(url);
    const baseUrl = url.replace(queryPart, '');
    console.log(url, baseUrl);
    var prevPage, nextPage = '';
    
    if (page){ 
        prevPage = baseUrl + `?page=${Number(page) - 1}`;
    } else {
        page = 1;
    }

    nextPage = baseUrl + `?page=${Number(page) + 1}`;


    if (itemsPerPage) {
        prevPage += `&itemsPerPage=${itemsPerPage}`;
        nextPage += `&itemsPerPage=${itemsPerPage}`;
    } else {
        itemsPerPage = 25;
    }

    const totalPageNum = Math.ceil(Number(count) / Number(itemsPerPage));

    const lastPage = baseUrl + `?page=${Number(totalPageNum)}`;


    const hal = {
        total: count,
        count: itemsPerPage,
        links: {
            self: url,
            first: baseUrl,
            prev: prevPage,
            next: nextPage,
            last: lastPage
        }
    }

    return hal;
};