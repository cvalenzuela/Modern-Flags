# coding: utf-8
import pandas
import pandas as pd
pd.read_csv("gini.csv")
get_ipython().magic(u'pinfo pd.read_csv')
pd.read_csv("gini.csv", delimiter=";")
ginidata=pd.read_csv("gini.csv", delimiter=";")
ginidata.ix[0]
ginidata.ix[1]
ginidata.ix[country == "Australia"]
ginidata.find
ginidata.loc[ginidata["country"] == "Australia"]
ginidata.loc[ginidata["country"] == "Australia"]["gini"]
ginidata["country"]
ginidata["country"].values
countries = ["Australia", "Chile"]
output_data=[]
output_data={}
ginidata=pd.read_csv("gini.csv", delimiter=";")
hdidata=pd.read_csv("hdi.csv", delimiter=";")
hdidata
output_data
for country in countries:
    gini_value = ginidata.loc[ginidata["country"] == country].value
    print(country, gini_value)
    
ginidata.loc[ginidata["country"] == country].
ginidata.loc[ginidata["country"] == country]
for country in countries:
    gini_value = ginidata.loc[ginidata["country"] == country]["gini"].value
    print(country, gini_value)
    
    
for country in countries:
    gini_value = ginidata.loc[ginidata["country"] == country]["gini"][0].value
    
    print(country, gini_value)
    
    
ginidata.loc[ginidata["country"] == "Chile"]["gini"][0].value
ginidata.loc[ginidata["country"] == "Chile"]["gini"]
ginidata.loc[ginidata["country"] == "Chile"]["gini"].values
ginidata.loc[ginidata["country"] == "Chile"]["gini"].values[0]
ginidata.loc[ginidata["country"] == "Chile"]["gini"].values[0]
ginidata.loc[ginidata["country"] == "Chile"]["gini"].values[0]
ginidata.join
ginidata.join(hdidata)
ginidata.join(hdidata, on="country")
ginidata.join(hdidata, on="country", lsuffix="_")
hdidata["country"]
ginidata.join(hdidata, on="country"’
ginidata.join(hdidata, on="country")
ginidata.join(hdidata, on="country", how=None)
ginidata.merge(hdidata)
co2data=pd.read_csv("co2.csv", delimiter=";")
ginidata.merge(hdidata).merge(co2data)
co2data=pd.read_csv("co2.csv", delimiter=";")
ginidata.merge(hdidata).merge(co2data)
popdata=pd.read_csv("population.csv", delimiter=";")
ginidata.merge(hdidata).merge(co2data).merge(popdata)
data=ginidata.merge(hdidata).merge(co2data).merge(popdata)
data.to_csv("aggregated.csv")
data.to_csv("aggregated.csv", index=False)
get_ipython().magic(u'save session')
get_ipython().magic(u'save session 1-52')
