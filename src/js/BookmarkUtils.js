class BookmarkUtils {

    
    
    static traverseExec(func, complete){
        browser.bookmarks.getTree().then(function(tree){
            BookmarkUtils.__traverseExec(tree[0].children, func, complete);
            
            if(typeof complete !== 'undefined'){
                complete();
            }
            
        });
    }

    static __traverseExec(tree, func){

        for(var i = 0, len = tree.length; i < len; i++){
            switch(tree[i].type){
                case 'bookmark':
                    func(tree[i]);
                    break;
                case 'folder':
                    BookmarkUtils.__traverseExec(tree[i].children, func);
                    break;
                case 'separator':
                    break;
            }
        }
    }
    
    static sortBookmarks(anchorElem, sortBy){
        switch(sortBy){
            case 'domain':
                return BookmarkUtils.sortBookmarksByDomain(anchorElem);
        }
    }
    
    static sortBookmarksByDomain(anchorElem){
        
        anchorElem.append('\
            <input name="order-dir" checked type="radio" id="order-normal">\n\
            <label for="order-normal">Order descending</label>\n\
            \n\
            <input name="order-dir" type="radio" id="order-reverse">\n\
            <label for="order-reverse">Order ascending</label>\n\
            \n\
            ');
                        
        var target = $('<div></div>').appendTo($('<div class="sorting-container"></div>').appendTo(anchorElem));
        
        BookmarkUtils.traverseExec(function(book){
            
            var domainName = Utils.getHostName(book.url);
            var domain = domainName.toLowerCase().replace(/\./g, "-");;

            

            var domainElem = target.find('#' + domain);
            
            if(domainElem.length == 0){
                domainElem = $('<div class="sorted-link-container" id="' + domain + '"><div data-count="1" class="count">1</div>' + domainName + '<hr></div>').appendTo(target);
            } else {
                var counter = domainElem.children('.count');
                counter.text(counter.data('count') + 1);
                
                counter.data('count', counter.data('count') + 1);
                
                domainElem.css('order', counter.data('count'));
            }
            
            domainElem.append("<a href='" + book.url + "'>" + book.title + "</a>");
        });
    }
    
    
    
    
    
    
    
    
    
    
    static async generateTreeView(anchorElem){


        var elem = $('<ul></ul>').appendTo($('<div class="treeview"></div>').appendTo(anchorElem));
        
        var tree = await browser.bookmarks.getTree();
        
        BookmarkUtils.__generateTree(elem, tree[0].children, 0);
    }
    
    static checkForBrokenBookmarks( anchor ) {
        
        var listElem = $('<ul class="editable-bookmarks"></ul>').appendTo(anchor);
        
        Utils.loadingOn();
        
        BookmarkUtils.traverseExec(function(book){
            
            
            $.ajax({
                url: book.url,
                timeout: 2000,
                error: function(jqXHR, textStatus){
                    
                    $(BookmarkUtils.__generateEditableBookmark(book, jqXHR.status))
                        .appendTo(listElem)
                        .find('a')
                        .click(function(){
                            var a = $(this).attr('data-action');

                            var b = $(this).parent().parent().data('id');

                            switch(a){
                                case 'del-list':
                                    $(this).parent().parent().remove();
                                    break;
                                case 'del-aprove':
                                    browser.bookmarks.remove(b);
                                    $(this).parent().parent().remove();
                                    break;
                                case 'del':
                                    $(this).attr('data-action', 'del-aprove');
                                    break;
                            }
                        });
                },
            });
        }, Utils.loadingOff );
    }
                    

        

    
    static __generateEditableBookmark(elem, status){
        return "<li class='editable-bookmark' data-id='" + elem.id + "'>\n\
                <span class='title'>"
                    + elem.title + 
                "</span>\n\
                <span class='time'>"
                    + (new Date(elem.dateAdded)) + 
                "</span>\n\
                <span class='httpstatus'>"
                    + status + 
                "</span>\n\
                <span class='buttons'>\n\
                    <a href='" + elem.url + "' target='_blank' data-action='visit'>\n\
                        <i class='fas fa-eye'></i></a>\n\
                    <a href='#' data-action='del-list'>\n\
                        <i class='fas fa-times'></i></a>\n\
                    <a href='#' data-action='del'>\n\
                        <i class='fas fa-trash-alt'></i>\n\
                        <i class='fas fa-question-circle'></i>\n\
                    </a>\n\
                </span>\n\
            </li>";
    }
    
    /**
     * Traverses every bookmark and executes the function in func, the first param of func is the current bookmark
     * @param {type} func
     * @returns {undefined}
     */
    
    
    
    
    static  __generateTree(anchor, tree, counter){        
        tree.forEach(function(element) {
            switch(element.type){
                case 'bookmark':
                    anchor.append('\n\
                        <li>\n\
                            <a href="' + element.url + '">' + element.title + '</a>\n\
                        </li>');
                    break;
                case 'folder':

                    var elem = $("<ul></ul>").appendTo($('<li></li>').appendTo(anchor).append('\n\
                        <input type="checkbox" id="item-' + counter + '"/>\n\
                        <label data-count="' + element.children.length + '" for="item-' + counter + '">' + element.title + '</label>\n\
                    '));

                    counter = BookmarkUtils.__generateTree(elem, element.children, ++counter);

                    break;
                case 'separator':
                    break;
            }
        });
        
        return counter;
    }
    
}