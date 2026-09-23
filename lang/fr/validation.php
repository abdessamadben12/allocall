<?php

return [
    'required' => 'Le champ :attribute est obligatoire.',
    'required_if' => 'Le champ :attribute est obligatoire.',
    'email' => 'Le champ :attribute doit contenir une adresse courriel valide.',
    'string' => 'Le champ :attribute doit contenir du texte.',
    'min' => ['string' => 'Le champ :attribute doit contenir au moins :min caracteres.'],
    'max' => ['string' => 'Le champ :attribute ne doit pas depasser :max caracteres.', 'file' => 'Le fichier ne doit pas depasser :max Ko.'],
    'file' => 'La piece jointe doit etre un fichier.',
    'mimes' => 'Le fichier doit etre de type :values.',
    'in' => 'La valeur du champ :attribute est invalide.',
    'attributes' => ['full_name' => 'nom complet', 'phone' => 'telephone', 'email' => 'courriel', 'message' => 'message', 'attachment' => 'piece jointe'],
];
