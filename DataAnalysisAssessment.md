# 🧀 Analyse des fromages canadiens et du climat

Ce notebook explore s'il existe une relation entre la **température moyenne des provinces canadiennes** et la **quantité de fromages produits**. L’objectif est de voir si le climat influence la production fromagère régionale.

On utilise :
- `cheese_data.csv` : données sur les fromages canadiens.
- `Canada_Temperature_Data.csv` : données de température par province.
- # Import des bibliothèques nécessaires
import pandas as pd
import matplotlib.pyplot as plt

# Style de graphique
plt.style.use('ggplot')

# Chargement des données
cheese_df = pd.read_csv("cheese_data.csv")
temp_df = pd.read_csv("Canada_Temperature_Data.csv")

# Nettoyage : enlever les températures manquantes
temp_df = temp_df[temp_df['Tm'].notna()]

# Moyenne des températures par province
temp_avg = temp_df.groupby("Prov")["Tm"].mean().reset_index()
temp_avg.columns = ["Province", "Average_Temperature"]

# Nombre de fromages par province
cheese_counts = cheese_df.groupby("ManufacturerProvCode")["CheeseId"].count().reset_index()
cheese_counts.columns = ["Province", "Cheese_Count"]

# Fusion des deux jeux de données
data = pd.merge(cheese_counts, temp_avg, on="Province")
data
# Graphique 1 : température vs nombre de fromages
plt.figure(figsize=(8,5))
plt.scatter(data["Average_Temperature"], data["Cheese_Count"], color='teal')
for i, row in data.iterrows():
    plt.text(row["Average_Temperature"], row["Cheese_Count"] + 1, row["Province"], ha='center')
plt.title("Température moyenne vs nombre de fromages")
plt.xlabel("Température moyenne annuelle (°C)")
plt.ylabel("Nombre de fromages")
plt.show()

# Graphique 2 : barres des fromages par province
data_sorted = data.sort_values("Cheese_Count", ascending=False)
plt.figure(figsize=(10,5))
plt.bar(data_sorted["Province"], data_sorted["Cheese_Count"], color='orange')
plt.title("Nombre de fromages par province")
plt.xlabel("Province")
plt.ylabel("Nombre de fromages")
plt.show()

## 🧠 Discussion

Le graphique en nuage de points montre qu’il n’y a **pas de relation claire et directe** entre la température et la quantité de fromages produits. Certaines provinces comme le Québec ou la Colombie-Britannique produisent plus de fromages, même si leur température moyenne n’est pas la plus élevée.

Cela suggère que **la tradition, la demande locale et l’économie agricole** sont probablement plus déterminants que le climat seul.

Cependant, les provinces très froides ont en général une production fromagère plus faible, ce qui peut refléter certaines contraintes liées à l’agriculture ou à la logistique dans ces régions.

### ✅ Conclusion :
Le climat n’est **pas le seul facteur** qui influence la production fromagère, mais il pourrait avoir un effet modérateur, surtout dans les régions extrêmes.
    
