$(document).ready(
    function () {
        $("#search-btn").on('click', function () {
            let searchString = $("#search-box").val();
            invokeWikiSearch(searchString);
            $("#search-box").val("");
        });

        $("#search-rand-btn").on('click', function () {
            window.open("https://en.wikipedia.org/wiki/Special:Random");
        });

        $("#search-box").keypress(function (e) {
            if (e.which == 13) {
                $("#search-btn").click();
            }
        });
    }

);

function invokeWikiSearch(query) {
    query = query.replace(/\s/g,"%20");

    let URL = "https://en.wikipedia.org/w/api.php?origin=*&action=query&list=search&format=json&srsearch="+query;

    $.ajax({
        url: URL,
        success: successFn
    });
}

function successFn(data) {
    data.query.search.map(makeListItem);
}

function makeListItem(item) {    
    pageTitle = item.title.replace(/\s/g,"_");

    let elementHTML=`   <li><a href="https://en.wikipedia.org/wiki/`+pageTitle+`" target="_blank" rel="noopener">
                          <div>`+item.title+`</div>
                            <p>`+item.snippet+`</p>
                        </a></li>`;        

    $("#search-result-list").append(elementHTML);                    
}

