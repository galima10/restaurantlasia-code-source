<?php
/**
 * Enregistre des catégories de blocs personnalisées pour l'éditeur Gutenberg.
 *
 * Cette fonction ajoute de nouvelles catégories de blocs à l'éditeur Gutenberg
 * pour aider à organiser les blocs personnalisés spécifiques au thème.
 *
 * @param array $categories Catégories de blocs existantes.
 * @return array Catégories de blocs modifiées incluant les personnalisées.
 */

function theme_register_block_categories($categories) {
    return array_merge(
        $categories,
        [
            [
                'slug'  => 'front-page',
                'title' => __('Page d\'accueil', 'theme-textdomain'),
                'icon'  => null,
            ],
            [
                'slug'  => 'children-pages',
                'title' => __('Pages enfants', 'theme-textdomain'),
                'icon'  => null,
            ],
            [
                'slug'  => 'general',
                'title' => __('Général', 'theme-textdomain'),
                'icon'  => null,
            ],
        ]
    );
}
add_filter('block_categories_all', 'theme_register_block_categories');