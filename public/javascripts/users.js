/**
 * prépare le DOM
 */
$(document).ready(function() {

	// Populate the user table on initial page load
	//table_users();

});

/* Redirection vers une fonction après un clique sur un bouton */
$('#AddUser').on('click', add_user);
$('#userList table tbody').on('click', 'td a.delete_user', delete_user);
$('#userList table tbody').on('click', 'td a.update_user', update_user);

/**
 * Fonctions
 */
/**
 * on remplit le tableau
 */
function test()
{
	var tableContent;

	tableContent = '';
	$.getJSON('/users/user', function(data)
	{
		$.each(data, function(){
		tableContent += '<input type="text" value=' + this.Firstname + '>';
		tableContent += '<td> <a href="#" class="update_user" rel="' + this._id + '">update</a></td>';
		});
		$('#userList table tbody').html(tableContent);
	});
};

function table_users()
{
	var tableContent;

	tableContent = '';
	/**
	 * on récupère le JSON de ce GET
	 */
	$.getJSON('/users/user', function(data)
	{
		/**
		 * on ajoute des cellules et on remplit pour chaque user (d'où le foreach)
		 */
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>' + this.Firstname + ' ' + this.Lastname + '</td>';
			tableContent += '<td>' + this.email + '</td>';
			tableContent += '<td>' + this.gender + '</td>';
			tableContent += '<td> <a href="#" class="delete_user" rel="' + this._id + '">delete</a></td>';
			tableContent += '<td> <a href="#" class="update_user" rel2="' + this._id + '">update</a></td>';
			tableContent += '</tr>';
		});
		/**
		 * et on envoie tout à la view
		 */
		$('#userList table tbody').html(tableContent);
	});
	return (0);
};


/* Ajout utilisateur */
function add_user(event)
{
	event.preventDefault();
	var err_incr;

	err_incr = 0;
	$('#add_user input').each(function(index, val)
		{
			if ($(this).val() == '')
				err_incr = err_incr + 1;
		});
	if (err_incr == 0)
		{
			var new_user = {
				'Lastname': $('#add_user fieldset input#Lastname').val(),
				'Firstname': $('#add_user fieldset input#Firstname').val(),
				'email': $('#add_user fieldset input#email').val(),
				'gender': $('#add_user fieldset input#gender').val()
			}
			$.ajax({type: 'POST', data: new_user, url: '/users/add_user', dataType: 'JSON'})
				.done(function(answer) {
					if (answer.msg === '')
						{
							$('#add_user fieldset input').val('');
							table_users();
						}
					else
						alert('Error: ' + answer.msg);
					});
		}
	else
		{
			alert('Il faut remplir toutes les cases !');
			return (-1);
		}
	return (0);
};

/* Delete user */
function delete_user()
{
	event.preventDefault();
	var ok;

	ok = confirm("Etes-vous sûr de vouloir supprimer cet utilisateur ?");
	if (ok == true)
	{
		$.ajax({type: 'DELETE', url: '/users/delete_user/' + $(this).attr('rel')})
			.done(function(answer) {
				if (answer.msg != '')
					alert(answer.msg);
				table_users();
			});
	}
	else
		return (-1);
	return (0);
};

/* Update user */
function update_user()
{
	event.preventDefault();
	var err_incr;
	var up_user;

	up_user = {
				'Firstname': $('input').val(),
	}
	$('#up_user input').each(function(index, val)
		{
			if ($(this).val() == '')
				err_incr = err_incr + 1;
		});
	if (err_incr == 0)
	{
		$.ajax({type: 'UPDATE', data: up_user, url: '/users/update_user/' + $(this).attr('rel'), dataType: 'JSON'})
			.done(function(answer) {
				if (answer.msg != '')
					alert(answer.msg);
				table_users();
			});
	}
	else
	{
		alert("C'est vide");
		return (-1);
	}
	return (0);
};