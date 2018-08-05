import os
import pycountry
files = [f for f in os.listdir('.') if os.path.isfile(f)]
print(files)
for file in files:
    try:
        os.rename(file, pycountry.countries.get(alpha_2=(file[:2].upper())).name+".png")
    except:
        print(file + " not found")
