<?php

add_action('init', 'theme_register_cpt_reservation');
function theme_register_cpt_reservation()
{
    $labels = [
        'name'               => 'Réservations',
        'singular_name'      => 'Réservation',
        'menu_name'          => 'Réservations',
        'add_new'            => 'Ajouter une réservation',
        'add_new_item'       => 'Ajouter une réservation',
        'edit_item'          => 'Modifier la réservation',
        'all_items'          => 'Toutes les réservations',
        'view_item'          => 'Voir la réservation',
        'search_items'       => 'Rechercher une réservation',
        'not_found'          => 'Aucune réservation trouvée',
        'not_found_in_trash' => 'Aucune réservation dans la corbeille',
    ];

    $args = [
        'labels'             => $labels,
        'public'             => false,        // Pas visible sur le front
        'show_ui'            => true,         // Visible dans l’admin
        'capability_type'    => 'post',
        'hierarchical'       => false,
        'menu_position'      => 6,
        'menu_icon'          => 'dashicons-calendar-alt',
        'supports'           => ['title', 'editor', 'custom-fields'],
    ];

    register_post_type('reservation', $args);
}

// Ajoute des colonnes personnalisées
add_filter('manage_reservation_posts_columns', function ($columns) {
    $columns['email'] = 'Email';
    $columns['phone'] = 'Téléphone';
    $columns['guests'] = 'Couverts';
    $columns['reservation_date'] = 'Date';
    $columns['reservation_time'] = 'Heure';
    return $columns;
});

// Affiche les données dans les colonnes personnalisées
add_action('manage_reservation_posts_custom_column', function ($column, $post_id) {
    switch ($column) {
        case 'email':
            echo esc_html(get_post_meta($post_id, '_email', true));
            break;
        case 'phone':
            echo esc_html(get_post_meta($post_id, '_phone', true));
            break;
        case 'guests':
            echo esc_html(get_post_meta($post_id, '_guests', true));
            break;
        case 'reservation_date':
            $raw_date = get_post_meta($post_id, '_reservation_date', true);
            if ($raw_date) {
                // Formate la date en jj mm aaaa
                $formatted_date = date('d/m/Y', strtotime($raw_date));
                echo esc_html($formatted_date);
            } else {
                echo '—'; // Affiche un tiret si aucune date n'est définie
            }
            break;
        case 'reservation_time':
            echo esc_html(get_post_meta($post_id, '_reservation_time', true));
            break;
    }
}, 10, 2);
