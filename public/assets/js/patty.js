$(document).ready(function(){
    $('.devour-burger').on("click", function(e) {
        e.preventDefault();

        const id = $(this).data('id');
        const eatBurger = $(this).data('eatburger');

        const devouredState = {
            devoured: eatBurger
        };

        $.ajax('/api/burgers/' + id, {
            type: 'PUT',
            data: devouredState
        }).then(function() {
            console.log(`change plate to ${devouredState}`);
            location.reload();
        });
    }); 
    

    $('.creat-from').on('submit', function(e) {
        e.preventDefault();
        const newBurger = {
            name: $('#patty').val(),
            devoured: $('[name=devoured]:checked').val().trim()
        };
        
        $.ajax('/api/burgers', {
            type: 'POST',
            data: newBurger
        }).then(function(){
            console.log('New burger added to the list!');
        });
    });

    $('.trash-burger').on('click', function(e) {
        e.preventDefault();
        const id = $(this).data('id')

        $.ajax(`/api/burgers/${id}`, {
            type: 'DELETE',
        }).then(function(){
            console.log(`Your ${id} burger was thrown away!`);
        });
    });

});