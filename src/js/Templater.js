
var Templater_Statics = {
    readyCallbacks: [],
};

class Templater {

    static async initialize() {
        await Templater.__initialize_main_nav();
        
        
        
        Templater.__templateInitialized();
    }
    
    static __templateInitialized(){
        Templater_Statics.readyCallbacks.forEach(function(element){
            element();
        });
    }
    
    static onTemplateReady(callback){
        Templater_Statics.readyCallbacks.push(callback);
    }
    
    static async __initialize_main_nav(){
        var elem = $('placeholder#nav-main-menu');
        
        if(elem.length > 0){
            return Templater.__loadTemplate( "nav/megamenu", elem, {
                'navitems': [
                    {
                        'type': 'navitem',
                        'title': 'Bookie',
                        'id': 'bookie-mainnav-mainpage',
                    },{
                        'type': 'navdropdown',
                        'title': '<i class="far fa-bookmark"></i> Bookmarks',
                        'headline': '<i class="far fa-bookmark"></i> Visualize Bookmarks',
                        'category': [
                            {
                                'headline': '<i class="fas fa-desktop"></i> Tech',
                                'items': [
                                    {
                                        'id': 'bookie-mainnav-vis-tree',
                                        'title': 'Show Bookmark Tree',
                                    },
                                ],
                            },{
                                'headline': '<i class="fas fa-sort"></i> Sorting',
                                'items': [
                                    {
                                        'id': 'bookie-mainnav-show-sorted-by-domain',
                                        'title': 'Sort Bookmarks by Domain',
                                    },
                                ],
                            },
                        ],
                    },{
                        'type': 'navdropdown',
                        'title': '<i class="fas fa-wrench"></i> Tools',
                        'headline': '<i class="fas fa-wrench"></i> Tools for your bookmarks',
                        'category': [
                            {
                                'headline': '<i class="fas fa-bug"></i> Debug your Bookmarks',
                                'items': [
                                    {
                                        'id': 'bookie-mainnav-broken-bookmarks',
                                        'title': '<i class="fas fa-unlink"></i> Broken Links',
                                    },
                                ],
                            },
                        ],
                    }
                ],
            });
        }
        
    }

    static async __loadTemplate(name, anchor, params = {}, ) {
        
        var file = browser.extension.getURL('templates/' + name + '.html');
        
        return $.ajax({
            type: "GET",
            url: file,
            dataType: 'text',
            success: function(data){
                var template = _.template(data);
                
                anchor.replaceWith(template(params));
            },
        });
    }
}