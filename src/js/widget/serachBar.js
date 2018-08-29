// 搜索控制 此组件要内页自已引入 div 结构
var searchbar = {
    init: function () {
        var $searchBar = $('#searchBar'),
            $searchResult = $('#searchResult'),
            $searchText = $('#searchText'),
            $searchInput = $('#searchInput'),
            $searchClear = $('#searchClear'),
            $searchCancel = $('#searchCancel');
        function hideSearchResult() {
            $searchResult.hide();
            $searchInput.val('');
        }
        function cancelSearch() {
            hideSearchResult();
            $searchBar.removeClass('weui-search-bar_focusing');
            $searchText.show();
        }
        $searchText.on('click', function () {
            $searchBar.addClass('weui-search-bar_focusing');
            $searchInput.focus();
        });
        $searchInput
            .on('blur', function () {
                if (!this.value.length) cancelSearch();
            })
            .on('input', function () {
                if (this.value.length) {
                    $searchResult.show();
                } else {
                    $searchResult.hide();
                }
            });
        $searchClear.on('click', function () {
            hideSearchResult();
            $searchInput.focus();
        });
        $searchCancel.on('click', function () {
            cancelSearch();
            $searchInput.blur();
        });
    }

};