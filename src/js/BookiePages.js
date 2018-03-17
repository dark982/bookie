class BookiePages {
    static overview(){
        var createData = {
            index: 0,
            url: "/html/pages/overview.html",
        };
          
        return browser.tabs.create(createData);
    }
}