<?php
/**
 * Custom Post Type Reviews
 * Ce fichier enregistre un Custom Post Type (CPT) pour les Avis.
 */

// Enregistre le Custom Post Type "Avis"
add_action('init', 'theme_register_cpt_review');
function theme_register_cpt_review()
{
    $labels = [
        'name'                  => 'Avis',
        'singular_name'         => 'Avis',
        'menu_name'             => 'Livre d’or',
        'add_new'               => 'Ajouter un avis',
        'add_new_item'          => 'Ajouter un avis',
        'edit_item'             => 'Modifier un avis',
        'all_items'             => 'Tous les avis',
        'view_item'             => 'Voir l’avis',
        'search_items'          => 'Rechercher un avis',
        'not_found'             => 'Aucun avis trouvé',
    ];

    $args = [
        'labels'             => $labels,
        'public'             => false,  // pas directement visible sur le front
        'show_ui'            => true,   // mais visible dans l’admin
        'capability_type'    => 'post',
        'hierarchical'       => false,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-format-chat',
        'supports'           => ['title', 'editor', 'author', 'custom-fields'],
    ];

    register_post_type('review', $args);
}

add_filter('manage_review_posts_columns', function ($columns) {
    $columns['email'] = 'Email'; // clé + titre colonne
    return $columns;
});

add_action('manage_review_posts_custom_column', function ($column, $post_id) {
    if ($column === 'email') {
        echo esc_html(get_post_meta($post_id, '_email', true));
    }
}, 10, 2);