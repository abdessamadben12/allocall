<x-mail::message>
# Nouvelle {{ $contactMessage->request_type === 'quote' ? 'demande de devis' : 'message de contact' }} recue

Un visiteur a soumis le formulaire {{ $contactMessage->request_type === 'quote' ? 'de devis' : 'de contact' }} sur le site Alidad :

**Nom complet :** {{ $contactMessage->first_name }} {{ $contactMessage->last_name }}  
**Adresse email :** {{ $contactMessage->email }}  
@if($contactMessage->phone)
**Telephone :** {{ $contactMessage->phone }}  
@endif
@if($contactMessage->project_type)
**Type de projet :** {{ $contactMessage->project_type }}  
@endif
@if($contactMessage->attachment_original_name)
**Piece jointe :** {{ $contactMessage->attachment_original_name }}  
@endif

**Message :**  
{{ $contactMessage->message }}  

Pour voir tous les messages recus, veuillez vous connecter au tableau de bord.

<x-mail::button :url="route('dashboard')">
Acceder au Tableau de Bord
</x-mail::button>

Cordialement,<br>
L'equipe {{ config('app.name') }}
</x-mail::message>
