/**
 * liste des users
 */
var userListData = [];

/**
 * prépare le DOM
 */
$(document).ready(function() {

    // Populate the user table on initial page load
    populateTable();

});

/**
 * Fonctions
 */

/**
 * on remplit le tableau
 */
function populateTable() {

    var tableContent = '';

    
    // on récupère le JSON de ce GET
    $.getJSON( '/users/userlist', function( data ) {

        
        // on ajoute des cellules et on remplit pour chaque user (d'où le foreach)
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td>' + this.firstname + ' ' + this.lastname + '</td>';
            tableContent += '<td>' + this.email + '</td>';
            tableContent += '<td>' + this.gender + '</td>';
            tableContent += '</tr>';
        });

        // et on envoie tout à la view
        $('#userList table tbody').html(tableContent);
    });
};