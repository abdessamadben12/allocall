<?php

namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        foreach (self::articles() as $article) {
            // Keyed on the French slug so the seeder can be re-run without duplicates.
            Article::updateOrCreate(['slug_fr' => $article['slug_fr']], [...$article, 'published' => true]);
        }
    }

    private static function articles(): array
    {
        return [
            [
                'slug_fr' => 'reception-telephonique-externalisee-avantages-pme',
                'slug_en' => 'outsourced-call-answering-benefits-small-business',
                'image' => '/images/articles/reception-telephonique.webp',
                'service' => '/services/reception-telephonique',
                'content' => [
                    'fr' => [
                        'title' => 'Réception téléphonique externalisée : pourquoi les PME franchissent le pas',
                        'seoTitle' => 'Réception téléphonique externalisée pour PME',
                        'description' => 'Appels manqués, standard saturé, horaires limités : découvrez comment une réception téléphonique externalisée aide votre PME à ne plus perdre de clients.',
                        'summary' => 'Chaque appel sans réponse est une opportunité qui part chez un concurrent. Externaliser votre accueil téléphonique permet de répondre à tous vos clients, sans recruter ni immobiliser votre équipe.',
                        'category' => 'Réception d’appels',
                        'sections' => [
                            ['heading' => 'Le coût caché des appels manqués', 'paragraphs' => [
                                'Un prospect qui tombe sur une messagerie rappelle rarement. Il compose simplement le numéro suivant dans les résultats de recherche. Pour une PME, ces appels perdus représentent un manque à gagner difficile à mesurer, mais bien réel.',
                                'Les pics d’activité, les pauses, les congés ou les rendez-vous à l’extérieur sont autant de moments où le téléphone sonne dans le vide. Une réception externalisée prend le relais exactement à ces moments-là.',
                            ]],
                            ['heading' => 'Une image professionnelle dès le premier contact', 'paragraphs' => [
                                'Vos appelants sont accueillis au nom de votre entreprise, selon un script validé avec vous. Ils obtiennent une réponse claire, une prise de message structurée ou un transfert vers la bonne personne.',
                                'Cette constance rassure vos clients et renforce votre crédibilité, notamment face à des concurrents plus grands.',
                            ]],
                            ['heading' => 'Plus de temps pour votre cœur de métier', 'paragraphs' => [
                                'Vos équipes ne sont plus interrompues en permanence. Elles se concentrent sur la production, la vente ou le service, tandis que les appels sont filtrés et qualifiés.',
                                'Vous recevez un compte rendu de chaque appel par courriel ou dans votre outil de gestion, pour assurer un suivi sans rien oublier.',
                            ]],
                            ['heading' => 'Un service qui s’adapte à votre volume', 'paragraphs' => [
                                'Contrairement à une embauche, l’externalisation s’ajuste à votre activité : débordement uniquement, horaires étendus ou prise en charge complète du standard.',
                                'Le bon point de départ consiste à analyser votre volume d’appels et vos plages horaires critiques pour définir la formule la plus rentable.',
                            ]],
                        ],
                    ],
                    'en' => [
                        'title' => 'Outsourced call answering: why small businesses are making the switch',
                        'seoTitle' => 'Outsourced call answering for small businesses',
                        'description' => 'Missed calls, busy lines, limited hours: learn how an outsourced call answering service helps your business stop losing customers.',
                        'summary' => 'Every unanswered call is an opportunity handed to a competitor. Outsourcing your phone reception lets you answer every customer without hiring or pulling your team away from their work.',
                        'category' => 'Call answering',
                        'sections' => [
                            ['heading' => 'The hidden cost of missed calls', 'paragraphs' => [
                                'A prospect who reaches voicemail rarely calls back. They simply dial the next number in the search results. For a small business, these lost calls are a shortfall that is hard to measure but very real.',
                                'Peak hours, breaks, holidays and off-site meetings are all moments when the phone rings unanswered. An outsourced reception service steps in at exactly those times.',
                            ]],
                            ['heading' => 'A professional image from the first contact', 'paragraphs' => [
                                'Callers are greeted in your company’s name, following a script agreed with you. They get a clear answer, a structured message or a transfer to the right person.',
                                'This consistency reassures your customers and strengthens your credibility, especially against larger competitors.',
                            ]],
                            ['heading' => 'More time for your core business', 'paragraphs' => [
                                'Your team is no longer constantly interrupted. They can focus on production, sales or service while calls are screened and qualified.',
                                'You receive a summary of every call by email or in your CRM, so nothing falls through the cracks.',
                            ]],
                            ['heading' => 'A service that scales with your volume', 'paragraphs' => [
                                'Unlike hiring, outsourcing adapts to your activity: overflow only, extended hours or full switchboard coverage.',
                                'The best starting point is to review your call volume and critical time slots to choose the most cost-effective option.',
                            ]],
                        ],
                    ],
                ],
            ],
            [
                'slug_fr' => 'gestion-des-leads-ne-plus-perdre-de-prospects',
                'slug_en' => 'lead-management-stop-losing-prospects',
                'image' => '/images/articles/gestion-leads.webp',
                'service' => '/services/gestion-leads',
                'content' => [
                    'fr' => [
                        'title' => 'Gestion des leads : 4 réflexes pour ne plus perdre de prospects',
                        'seoTitle' => 'Gestion des leads : ne plus perdre de prospects',
                        'description' => 'Rappel rapide, qualification, relances, suivi : les bonnes pratiques de gestion des leads pour transformer plus de demandes en clients.',
                        'summary' => 'Générer des demandes coûte cher. Les laisser refroidir faute de suivi coûte encore plus. Voici les réflexes qui font la différence entre un formulaire oublié et un nouveau client.',
                        'category' => 'Gestion des leads',
                        'sections' => [
                            ['heading' => 'Rappeler vite, idéalement dans l’heure', 'paragraphs' => [
                                'Un prospect qui remplit un formulaire est à son plus haut niveau d’intérêt. Plus le délai de rappel s’allonge, plus il compare, hésite ou signe ailleurs.',
                                'Mettre en place un rappel systématique et rapide est souvent le levier le plus simple pour améliorer votre taux de conversion.',
                            ]],
                            ['heading' => 'Qualifier avant de transmettre aux commerciaux', 'paragraphs' => [
                                'Toutes les demandes n’ont pas la même valeur. Une courte qualification — besoin, budget, délai, décideur — permet à vos commerciaux de se concentrer sur les opportunités réelles.',
                                'Les leads non prêts ne sont pas perdus pour autant : ils rejoignent un circuit de relance adapté.',
                            ]],
                            ['heading' => 'Relancer avec méthode', 'paragraphs' => [
                                'La plupart des ventes demandent plusieurs contacts. Un plan de relance défini à l’avance (appel, courriel, nouvel appel) évite que des prospects tièdes tombent dans l’oubli.',
                                'Chaque échange est consigné pour que la conversation reprenne là où elle s’était arrêtée.',
                            ]],
                            ['heading' => 'Mesurer pour améliorer', 'paragraphs' => [
                                'Délai moyen de rappel, taux de joignabilité, taux de qualification et taux de transformation : ces indicateurs montrent précisément où se perdent vos prospects.',
                                'Avec une équipe dédiée à la gestion des leads, vous obtenez ces données chaque semaine et pouvez ajuster vos campagnes en conséquence.',
                            ]],
                        ],
                    ],
                    'en' => [
                        'title' => 'Lead management: 4 habits to stop losing prospects',
                        'seoTitle' => 'Lead management: stop losing prospects',
                        'description' => 'Fast callbacks, qualification, follow-ups and tracking: lead management best practices to turn more enquiries into customers.',
                        'summary' => 'Generating enquiries is expensive. Letting them go cold for lack of follow-up costs even more. These habits make the difference between a forgotten form and a new customer.',
                        'category' => 'Lead management',
                        'sections' => [
                            ['heading' => 'Call back fast, ideally within the hour', 'paragraphs' => [
                                'A prospect who fills in a form is at peak interest. The longer the callback takes, the more they compare, hesitate or sign elsewhere.',
                                'A systematic, fast callback process is often the simplest way to improve your conversion rate.',
                            ]],
                            ['heading' => 'Qualify before passing leads to sales', 'paragraphs' => [
                                'Not every enquiry has the same value. A short qualification — need, budget, timing, decision maker — lets your sales team focus on real opportunities.',
                                'Leads that are not ready are not lost: they enter a suitable follow-up track.',
                            ]],
                            ['heading' => 'Follow up methodically', 'paragraphs' => [
                                'Most sales take several touchpoints. A follow-up plan defined in advance (call, email, another call) keeps lukewarm prospects from being forgotten.',
                                'Every exchange is logged so the conversation picks up where it left off.',
                            ]],
                            ['heading' => 'Measure to improve', 'paragraphs' => [
                                'Average callback time, contact rate, qualification rate and conversion rate show exactly where prospects are lost.',
                                'With a team dedicated to lead management, you get this data every week and can adjust your campaigns accordingly.',
                            ]],
                        ],
                    ],
                ],
            ],
            [
                'slug_fr' => 'prise-de-rendez-vous-externalisee-reduire-absences',
                'slug_en' => 'outsourced-appointment-setting-reduce-no-shows',
                'image' => '/images/articles/prise-rendez-vous.webp',
                'service' => '/services/prise-rendez-vous',
                'content' => [
                    'fr' => [
                        'title' => 'Prise de rendez-vous externalisée : remplir l’agenda et réduire les absences',
                        'seoTitle' => 'Prise de rendez-vous externalisée',
                        'description' => 'Comment une prise de rendez-vous externalisée, avec confirmations et rappels, aide à remplir votre agenda et à réduire les rendez-vous manqués.',
                        'summary' => 'Un agenda bien rempli ne suffit pas : encore faut-il que les clients se présentent. Une prise de rendez-vous externalisée agit sur les deux leviers à la fois.',
                        'category' => 'Rendez-vous',
                        'sections' => [
                            ['heading' => 'Ne plus manquer les demandes de rendez-vous', 'paragraphs' => [
                                'Les clients appellent souvent quand votre équipe est occupée. Un service de prise de rendez-vous répond à ces appels, propose des créneaux et réserve directement dans votre agenda.',
                                'Le client repart avec une date confirmée au lieu d’une promesse de rappel.',
                            ]],
                            ['heading' => 'Confirmer et rappeler pour limiter les absences', 'paragraphs' => [
                                'Un appel ou un message de confirmation la veille rappelle le rendez-vous et permet de le déplacer à temps si besoin.',
                                'Les créneaux libérés peuvent ensuite être proposés à d’autres clients, plutôt que de rester vides.',
                            ]],
                            ['heading' => 'Un agenda mieux organisé', 'paragraphs' => [
                                'Les règles de réservation sont définies avec vous : durée par type de prestation, temps de déplacement, plages réservées. Votre planning reste cohérent et réaliste.',
                                'Vos équipes gagnent du temps et arrivent préparées grâce aux informations recueillies lors de la prise de rendez-vous.',
                            ]],
                            ['heading' => 'Pour quels secteurs ?', 'paragraphs' => [
                                'Santé, services à domicile, immobilier, automobile, conseil : toute activité qui vit de ses rendez-vous peut en bénéficier.',
                                'La mise en place démarre par l’accès à votre outil d’agenda et la rédaction d’un script adapté à vos prestations.',
                            ]],
                        ],
                    ],
                    'en' => [
                        'title' => 'Outsourced appointment setting: fill your calendar and reduce no-shows',
                        'seoTitle' => 'Outsourced appointment setting',
                        'description' => 'How outsourced appointment setting, with confirmations and reminders, helps fill your calendar and reduce missed appointments.',
                        'summary' => 'A full calendar is not enough: customers also need to show up. Outsourced appointment setting works on both at once.',
                        'category' => 'Appointments',
                        'sections' => [
                            ['heading' => 'Never miss a booking request', 'paragraphs' => [
                                'Customers often call when your team is busy. An appointment setting service answers those calls, offers time slots and books directly into your calendar.',
                                'The customer leaves with a confirmed date instead of a promise to call back.',
                            ]],
                            ['heading' => 'Confirm and remind to reduce no-shows', 'paragraphs' => [
                                'A confirmation call or message the day before reminds the customer and gives them a chance to reschedule in time.',
                                'Freed-up slots can then be offered to other customers instead of staying empty.',
                            ]],
                            ['heading' => 'A better organised calendar', 'paragraphs' => [
                                'Booking rules are set with you: duration per service, travel time, reserved slots. Your schedule stays consistent and realistic.',
                                'Your team saves time and arrives prepared thanks to the information collected at booking.',
                            ]],
                            ['heading' => 'Which industries benefit?', 'paragraphs' => [
                                'Healthcare, home services, real estate, automotive, consulting: any business that runs on appointments can benefit.',
                                'Setup starts with access to your scheduling tool and a script tailored to your services.',
                            ]],
                        ],
                    ],
                ],
            ],
            [
                'slug_fr' => 'ia-et-humain-service-client-bon-equilibre',
                'slug_en' => 'ai-and-humans-in-customer-service-right-balance',
                'image' => '/images/articles/ia-service-client.webp',
                'service' => '/services/assistants-virtuels',
                'content' => [
                    'fr' => [
                        'title' => 'IA et humain dans le service client : trouver le bon équilibre',
                        'seoTitle' => 'IA et humain dans le service client',
                        'description' => 'Assistants virtuels, automatisation et conseillers humains : comment combiner l’IA et l’humain pour un service client rapide et de qualité.',
                        'summary' => 'L’intelligence artificielle transforme le service client, mais elle ne remplace pas l’écoute d’un conseiller. Les entreprises qui réussissent combinent les deux.',
                        'category' => 'Intelligence artificielle',
                        'sections' => [
                            ['heading' => 'Ce que l’IA fait très bien', 'paragraphs' => [
                                'Répondre aux questions fréquentes, orienter les demandes, collecter les informations de base ou proposer des créneaux : ces tâches répétitives sont idéales pour un assistant virtuel.',
                                'Disponible à toute heure, il absorbe les pics de volume et réduit le temps d’attente.',
                            ]],
                            ['heading' => 'Là où l’humain reste indispensable', 'paragraphs' => [
                                'Réclamations, situations sensibles, ventes complexes ou clients mécontents demandent de l’empathie et du jugement.',
                                'Un conseiller sait reformuler, rassurer et trouver une solution qui sort du cadre prévu.',
                            ]],
                            ['heading' => 'Organiser le relais entre IA et conseillers', 'paragraphs' => [
                                'Le point clé est la transition : le client doit pouvoir joindre un humain facilement, sans répéter son histoire.',
                                'L’assistant transmet le contexte de l’échange au conseiller, qui reprend la conversation directement là où elle en était.',
                            ]],
                            ['heading' => 'Commencer par les bons cas d’usage', 'paragraphs' => [
                                'Plutôt que de tout automatiser, identifiez les demandes les plus fréquentes et les plus simples. Ce sont elles qui offrent le meilleur retour sur investissement.',
                                'Les résultats sont ensuite mesurés et le périmètre de l’IA élargi progressivement.',
                            ]],
                        ],
                    ],
                    'en' => [
                        'title' => 'AI and humans in customer service: finding the right balance',
                        'seoTitle' => 'AI and humans in customer service',
                        'description' => 'Virtual assistants, automation and human agents: how to combine AI and people for fast, high-quality customer service.',
                        'summary' => 'Artificial intelligence is transforming customer service, but it does not replace a skilled agent. The companies that succeed combine both.',
                        'category' => 'Artificial intelligence',
                        'sections' => [
                            ['heading' => 'What AI does very well', 'paragraphs' => [
                                'Answering common questions, routing requests, collecting basic information or offering time slots: these repetitive tasks are ideal for a virtual assistant.',
                                'Available around the clock, it absorbs volume peaks and cuts waiting times.',
                            ]],
                            ['heading' => 'Where people remain essential', 'paragraphs' => [
                                'Complaints, sensitive situations, complex sales or unhappy customers call for empathy and judgement.',
                                'An agent can rephrase, reassure and find a solution outside the expected script.',
                            ]],
                            ['heading' => 'Organise the handover between AI and agents', 'paragraphs' => [
                                'The key is the transition: customers must be able to reach a person easily, without repeating themselves.',
                                'The assistant passes the conversation context to the agent, who picks up exactly where it left off.',
                            ]],
                            ['heading' => 'Start with the right use cases', 'paragraphs' => [
                                'Rather than automating everything, identify the most frequent and simplest requests. They deliver the best return on investment.',
                                'Results are then measured and the scope of AI expanded step by step.',
                            ]],
                        ],
                    ],
                ],
            ],
        ];
    }
}
