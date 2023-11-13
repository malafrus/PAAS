import apache_beam as beam
from apache_beam.io.gcp.internal.clients import bigquery
from apache_beam.options.pipeline_options import PipelineOptions
import os
import json
import logging

bucker_link = 'gs://malafrus-bucket-velib-libre/data_1697547960951.json'

table_spec = bigquery.TableReference(
    projectId='androidprojecttrochon',
    datasetId='velib',
    tableId='amiens'
)

beam_options = PipelineOptions(
    #runner="DataflowRunner",
    project='AndroidProjectTrochon',
    job_name="velam",
    region="europe-west9",
)

table_schema = {
    'fields': [{
        'name': 'nom_station', 'type': 'STRING', 'mode': 'NULLABLE'
    }]
}

class Nomstation(beam.DoFn):
    def process(self, stations):
        return [station for station in stations]
    

def run():
    with beam.Pipeline() as p:
        (p | 'Read' >> beam.io.ReadFromText(bucker_link)
        | "Lit les données" >> beam.Map(lambda line: json.loads(line))
        | "Slit stations" >> beam.ParDo(Nomstation())
        | "Nom des stations" >> beam.Map(lambda station: station['name'] if station['name'] is not None else '')
        | "mise en forme" >> beam.Map(lambda nom: {'nom_station': nom})
        | "Enregistre les données" >> beam.io.WriteToBigQuery(table_spec,
                                                              schema=table_schema,
                                                              custom_gcs_temp_location='gs://malafrus-bucket-velim-temp',
                                                              write_disposition=beam.io.BigQueryDisposition.WRITE_TRUNCATE,
                                                              create_disposition=beam.io.BigQueryDisposition.CREATE_IF_NEEDED))

        p.run()

if __name__ == "__main__":
    logging.getLogger().setLevel(logging.INFO)
    run()
                                        