<?php

/**
 * Ce fichier supprime le Custom Post Type "Articles" du site WordPress qui n'est pas utilisé.
 * Il enlève les articles du menu d'administration, désenregistre les taxonomies associées
 */

add_action('admin_menu', function () {
    remove_menu_page('edit.php'); // Masque le menu "Articles"
});

add_action('init', function () {
    unregister_taxonomy_for_object_type('category', 'post'); // Supprime les catégories pour les articles
    unregister_taxonomy_for_object_type('post_tag', 'post'); // Supprime les étiquettes pour les articles
});

add_action('template_redirect', function () {
    if (is_singular('post')) {
        wp_redirect(home_url());
        exit;
    }
});

add_action('widgets_init', function () {
    unregister_widget('WP_Widget_Recent_Posts'); // Supprime le widget "Articles récents"
    unregister_widget('WP_Widget_Archives'); // Supprime le widget "Archives"
});

add_action('do_feed', function () {
    wp_die('Flux RSS désactivé.');
}, 1);

add_action('do_feed_rdf', '__return_false', 1);
add_action('do_feed_rss', '__return_false', 1);
add_action('do_feed_rss2', '__return_false', 1);
add_action('do_feed_atom', '__return_false', 1);

add_action('pre_get_posts', function ($query) {
    // Vérifie que ce n'est pas une requête dans l'administration et que c'est la requête principale
    if (!is_admin() && $query->is_main_query()) {
        // Exclut uniquement les articles (post)
        if ($query->is_home() || $query->is_category() || $query->is_tag() || $query->is_author()) {
            $query->set('post_type', ['page']); // Affiche uniquement les pages pour les requêtes liées aux articles
        }
    }
});
