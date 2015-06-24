/**
 * prépare le DOM
 */
$(document).ready(function() {

	// Populate the user table on initial page load
	table_articles();
});

/* Redirection vers une fonction après un clique sur un bouton */
$('#post_art').on('click', add_article);

function table_articles() {

	var tableContent;

	tableContent = '';
	/**
	 * on récupère le JSON de ce GET
	 */
	$.getJSON('/users/articlelist', function(data)
	{
		/**
		 * on ajoute des cellules et on remplit pour chaque user (d'où le foreach)
		 */
		$.each(data, function(){
			tableContent += '<tr>';
			tableContent += '<td>' + this.title + '</td>';
			tableContent += '<td>' + this.content + '</td>';
			tableContent += '<td> <a href="#" class="delete_article" rel="' + this._id + '">delete</a></td>';
			tableContent += '</tr>';
		});

		/**
		 * et on envoie tout à la view
		 */
		$('#articleList table tbody').html(tableContent);
	});
	return (0);
};

/* Ajout article */
function add_article(event)
{
	event.preventDefault();
	var err_incr;

	err_incr = 0;
	$('#add_article input').each(function(index, val)
		{
			if ($(this).val() == '')
				err_incr = 1;
		});
	if (err_incr == 0)
		{
			var new_article = {
				'title': $('#add_article input#title').val(),
				'content': $('#add_article textarea#content').val()
			}
			$.ajax({type: 'POST', data: new_article, url: '/users/add_user', dataType: 'JSON'})
				.done(function(answer) {
				alert("Article posted");
				$('#add_article input').val('');
				$('#add_article textarea').val('');
			});
		}
	else
		{
			alert('Il faut mettre un titre');
			return (-1);
		}
	return (0);
};

/* Delete article */
function delete_article()
{
	event.preventDefault();
	var ok;

	ok = confirm("Etes-vous sûr de vouloir supprimer cet article ?");
	if (ok == true)
	{
		$.ajax({type: 'DELETE', url: '/users/delete_user/' + $(this).attr('rel')})
			.done(function(answer) {
				if (answer.msg != '')
					alert(answer.msg);
			});
	}
	else
		return (-1);
	return (0);
};