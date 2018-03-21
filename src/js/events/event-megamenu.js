Templater.onTemplateReady(function(){
    $('#nav-main-menu a').click(function(){
        $('#nav-main-menu .active').removeClass('active');
        
        $(this).parents(".dropdown").addClass('active');
        $(this).addClass('active');
    });
    
    $('#nav-main-menu #bookie-mainnav-vis-tree').click(function(){
        BookmarkUtils.generateTreeView($('#main-content').empty());
    });
    
    $('#nav-main-menu #bookie-mainnav-broken-bookmarks').click(function(){
        
        
        BookmarkUtils.checkForBrokenBookmarks($('#main-content').empty());        
    });
    
    $('#nav-main-menu #bookie-mainnav-show-sorted-by-domain').click(function(){
        
        
        BookmarkUtils.sortBookmarks($('#main-content').empty(), 'domain');        
    });
});