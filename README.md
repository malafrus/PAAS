User : Loic TROCHON
# PAAS

## OBJECTIF
Création d'une application pour réservation de Vélib, qui fait des prévisions de retour des vélibs loués, pour prévenir l'utilisateur s'il est plus judicieux pour lui de marcher jusqu'à la prochaine station ou d'attendre le retour d'un Vélib.

## BESOIN
- Cloud Scheduler :      Programme le pub/sub pour qu'il s'effectue régulièrement.
- Pub/sub :              Faire une requête sur l'API JCDecaux et le stock dans un bucket.
- Bucket :               Stock le résultat des requêtes pour faire un historique.
  
## CREATION

## BUDGET
- Cloud Scheduler : https://cloud.google.com/scheduler/pricing?hl=fr  
Le Cloud Scheduler est gratuit car on nous offre jusqu'à 3 jobs par mois. Sans cette offre, le service nous couterais 0,1/jour soit 0,003$.

- Pub/sub : https://cloud.google.com/pubsub/pricing?hl=fr


- Bucket : https://cloud.google.com/storage/pricing?hl=fr#europe
Le prix du bucket s'éstime par rapport de la région et de la volumetrie par mois. Etant données que notre API se trouve en france, il serai plus intéressant de stocker nos données en france. On prend donc la région de Paris (europe-west9) ce qui nous revient à 0,0023$/mois.
  
