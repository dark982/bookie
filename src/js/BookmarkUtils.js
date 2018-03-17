class BookmarkUtils {
    static async generateTreeView(anchorElem){


        var elem = $('<ul></ul>').appendTo($('<div class="treeview"></div>').appendTo(anchorElem));
        
        var tree = await browser.bookmarks.getTree();
        
        this.__generateTree(elem, tree[0].children, 0);
    }
    
    static checkForBrokenBookmarks() {
        
        var erroredbookmarks = [];
        var count = 0;
        
        this.traverseExec(async function(book){
            count++;
            if( count == 10 ){
                return;
            }
            
            await $.ajax( book.url ).fail(function (jqXHR){
                erroredbookmarks.push(book.id);
            });        
            
            
        });
        
        console.log(erroredbookmarks);
    }
    
    
    /**
     * Traverses every bookmark and executes the function in func, the first param of func is the current bookmark
     * @param {type} func
     * @returns {undefined}
     */
    static async traverseExec(func){
        var tree = await browser.bookmarks.getTree();
        
        this.__traverseExec(func, tree[0].children);
    }
    
    static __traverseExec(func, tree){

        tree.forEach(function(element) {
            switch(element.type){
                case 'bookmark':
                    func(element);
                    break;
                case 'folder':
                    BookmarkUtils.__traverseExec(func, element.children);
                    break;
                case 'separator':
                    break;
            }
        });
    }
    
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