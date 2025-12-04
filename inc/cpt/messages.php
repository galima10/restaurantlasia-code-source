<?php
/**
 * Custom Post Type Messages
 * Ce fichier enregistre un Custom Post Type (CPT) pour les Messages.
 */

add_action('init', 'theme_register_cpt_message');
function theme_register_cpt_message()
{
    $labels = [
        'name'               => 'Messages',
        'singular_name'      => 'Message',
        'menu_name'          => 'Messages',
        'add_new'            => 'Ajouter un message',
        'add_new_item'       => 'Ajouter un message',
        'edit_item'          => 'Modifier le message',
        'all_items'          => 'Tous les messages',
        'view_item'          => 'Voir le message',
        'search_items'       => 'Rechercher un message',
        'not_found'          => 'Aucun message trouvé',
        'not_found_in_trash' => 'Aucun message dans la corbeille',
    ];

    $args = [
        'labels'             => $labels,
        'public'             => false,        // pas visible sur le front
        'show_ui'            => true,         // mais visible dans l’admin
        'capability_type'    => 'post',
        'hierarchical'       => false,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-email',
        'supports'           => ['title', 'editor', 'author', 'custom-fields'],
    ];

    register_post_type('message', $args);
}


add_filter('manage_message_posts_columns', function ($columns) {
    $columns['email'] = 'Email'; // clé + titre colonne
    return $columns;
});

add_action('manage_message_posts_custom_column', function ($column, $post_id) {
    if ($column === 'email') {
        echo esc_html(get_post_meta($post_id, '_email', true));
    }
}, 10, 2);