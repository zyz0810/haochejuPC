//判断分类页列表级数
function categoryStep() {
    var pageListTypeFn = 1;
    for (var i = 0; i < categorys.length; i++) {
        if (categorys[i].childrens && categorys[i].childrens != '') {
            if (pageListTypeFn == 3) {
                break;
            }
            pageListTypeFn = 2;
            for (var j = 0; j < categorys[i].childrens.length; j++) {
                if (categorys[i].childrens[j].childrens && categorys[i].childrens[j].childrens != '' && categorys[i].childrens[j].length != 0) {
                    pageListTypeFn = 3;
                    break;
                }
            }
        }
    }
    return pageListTypeFn;
}
function reviseCategorys(){
    var step = categoryStep();
    $('html').attr('data-type', step)
    if (step == 1) {
        categorys = [{"id": "","name": "","tag": "","image": "","childrens": [{"id": "", "name": "", "tag": "", "image": "", "childrens": categorys}]
        }];
    } else if (step == 2) {
        categorys = [{"id": "", "name": "", "tag": "", "image": "", "childrens": categorys}];
    }
}

function getCategoryChildRensFin(id) {
    for (var i = 0; i < categorys.length; i++) {
        if (categorys[i].id == id) {
            return categorys[i].childrens;
        }
    }
}