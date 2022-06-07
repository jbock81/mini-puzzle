var is_success = false;
var puzzle_file = "puzzle.html";
var solution_file = "solution.html";
var puzzle_html = '';

// var current_mode = screen.orientation;
// // type
// alert(current_mode.type);
// // angle
// alert(current_mode.angle);

screen.orientation.addEventListener('change', function() {
    console.log('Current orientation is ' + screen.orientation.type);  
});

screen.orientation.lock("landscape")
    .then(function() {
        //alert('Locked');
        showPortal();
    })
    .catch(function(error) {
        //alert(error);
        showPortal();
    }
);

function showPortal(){
    $(document).ready(()=>{
        createCustomBox("#box-container", {
            boxImage : {
                lock_src : "./assets/images/locks_and_crates/crate-lock-2.png",
                unlock_src : "./assets/images/locks_and_crates/crate-unlock-2.png",
                width : 180,
                height : 125
            },
            lockImage : {
                src : "./assets/images/locks_and_crates/lock.png",
                width : 18,
                height : 18,
                position : [
    
                    { x : 55, y : 40 },
    
                ]
            },
            unlockImage : {
                src : "./assets/images/locks_and_crates/unlock.png"
            }
        });
    
        $(".box-image").click(() => {
            if (is_success == true)
            {
                location.href = "success.html";
            }
        });
    
        showPuzzle();
        
        $("#btn_solution").click(() => {
            showSolution();    
        });
    
        $("#btn_puzzle").click(() => {
            showPuzzle();
        });
    
    });
}

function showPuzzle()
{
    $(document).ready(()=>{
        $("#main_div").hide();
        $("#btn_puzzle").hide();
        $("#btn_solution").show();
        
        $.get(puzzle_file,
            { '_': $.now() } // Prevents caching
        ).done(function(data) {    
            // Here's the HTML 
            $("#solution_div").html(data);
            $("#solution_div").show();
        }).fail(function(jqXHR, textStatus) {
            // Handle errors here
        });
    });
}

function showSolution()
{
    $(document).ready(()=>{
        $("#solution_div").hide();
        $("#main_div").show();
        $("#btn_solution").hide();
        $("#btn_puzzle").show();
    });
}
