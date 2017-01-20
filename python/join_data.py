
# coding: utf-8
import pandas as pd
ginidata = pd.read_csv("data/gini.csv", delimiter=";")
hdidata = pd.read_csv("data/hdi.csv", delimiter=";")
co2data = pd.read_csv("data/co2.csv", delimiter=";")
population_data = pd.read_csv("data/population.csv", delimiter=";")
merged_data = ginidata.merge(hdidata).merge(co2data).merge(population_data)
merged_data.to_csv("data/merged_data.csv", index=False)



