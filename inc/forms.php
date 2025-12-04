<?php

/**
 * REST API Endpoints for Forms
 * Ce fichier crée des endpoints REST API pour gérer les soumissions de formulaires
 * pour les Custom Post Types (CPT) "review" et "message".
 */

// Fonction pour insérer un post CPT à partir des données reçues
function theme_insert_cpt_post($request, $post_type, $required_fields = ['name', 'text'])
{
    $params = $request->get_json_params();

    // Vérifie que tous les champs requis sont présents
    foreach ($required_fields as $field) {
        if (!isset($params[$field]) || trim($params[$field]) === '') {
            return new WP_REST_Response([
                'success' => false,
                'message' => "Missing field: $field"
            ], 400);
        }
    }

    $post_id = wp_insert_post([
        'post_type'    => $post_type,
        'post_title'   => sanitize_text_field($params['name']),
        'post_content' => sanitize_textarea_field($params[$required_fields[1]]),
        'post_status'  => 'publish', // ou 'pending' si tu veux modérer
    ]);

    // Ajoute les métadonnées si elles existent
    // Pour les reviews et messages, on gère seulement 'name', 'text' et 'email'
    // Pour les réservations, on gère des champs supplémentaires : 'name', 'email', 'phone', 'guests', 'reservationDate', 'reservationTime'
    if ($post_type === 'review' || $post_type === 'message') {
        if (!empty($params['email'])) {
            update_post_meta($post_id, '_email', sanitize_email($params['email']));
        }
    } elseif ($post_type === 'reservation') {
        if (!empty($params['email'])) {
            update_post_meta($post_id, '_email', sanitize_email($params['email']));
        }

        if (!empty($params['phone'])) {
            update_post_meta($post_id, '_phone', sanitize_text_field($params['phone']));
        }

        if (!empty($params['guests'])) {
            update_post_meta($post_id, '_guests', intval($params['guests']));
        }

        if (!empty($params['reservationDate'])) {
            update_post_meta($post_id, '_reservation_date', sanitize_text_field($params['reservationDate']));
        }

        if (!empty($params['reservationTime'])) {
            update_post_meta($post_id, '_reservation_time', sanitize_text_field($params['reservationTime']));
        }
    }


    if (is_wp_error($post_id)) {
        return new WP_REST_Response([
            'success' => false,
            'message' => $post_id->get_error_message()
        ], 500);
    }

    return new WP_REST_Response([
        'success' => true,
        'id'      => $post_id,
        'date'    => get_the_date('d M Y', $post_id), // exemple : 12 Sep 2025
    ], 200);
}

// Endpoints REST API pour ajouter des reviews et messages
add_action('rest_api_init', function () {
    register_rest_route('theme/v1', '/add-review', [
        'methods'  => 'POST',
        'callback' => function ($request) {
            return theme_insert_cpt_post($request, 'review', ['name', 'text']);
        },
        'permission_callback' => '__return_true',
    ]);
});

add_action('rest_api_init', function () {
    register_rest_route('theme/v1', '/add-message', [
        'methods'  => 'POST',
        'callback' => function ($request) {
            return theme_insert_cpt_post($request, 'message', ['name', 'text']);
        },
        'permission_callback' => '__return_true',
    ]);
});


// Endpoint REST API pour ajouter une réservation
add_action('rest_api_init', function () {
    register_rest_route('theme/v1', '/add-reservation', [
        'methods'  => 'POST',
        'callback' => function ($request) {
            return theme_insert_cpt_post($request, 'reservation', [
                'name',
                'email',
                'phone',
                'guests',
                'reservationDate',
                'reservationTime'
            ]);
        },
        'permission_callback' => '__return_true',
    ]);
});
