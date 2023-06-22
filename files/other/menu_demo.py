import os

menu="""
Prebranec, čevapčiči, napitek
Pečen riž z zelenjavo, napitek
Ješprenjčkova rižota s teletino in korenčkom, napitek
Puranja pečenka, ajdova kaša, napitek
Svaljki z gobovo omako, napitek
Svaljki s šparglji in bučkami, napitek
Njoki z bučkami in gamberi, napitek
Fingersova solata, balzamični preliv, voda v plastenki
Grški sendvič z olivami, paradižnikom in feta sirom v polnozrnati štr., napitek, sadje
Sočna solata s kus kusom, piščancem in zelenjavo, voda v plastenki
Njoki s curry omako in arašidi, napitek
Dušena govedina v čebulni omaki, pire krompir, napitek
Domači skutni štruklji s suhim sadjem, napitek
Bulgur z zelenjavo in tuno, napitek
File postrvi s krompirjem in tržaško omako, napitek
Dvojni polžki, bolones omaka,napitek
Pečen riž s piščancem in zelenjavo,napitek
Sendvič z mozzarello, paradižnikom in rukolo, napitek
Puranja pečenka, ajdova kaša,napitek
Svaljki z gobovo omako,napitek
Svaljki s šparglji in bučkami, napitek
Rižota s piščancem in zelenjavo, napitek
Sendvič s kuhanim pršutom in sirom, napitek
Golaž s sojinimi koščki, pečena polenta, kruh, voda v plastenki
Ajdova kaša z jurčki, napitek
Dušen riž, puranja pečenka v naravni omaki
Sendvič z lososovim namazom in sirom, voda v plastenki
Kus kus s tunino in morskimi sadeži, napitek
File postrvi s krompirjem in tržaško omako,napitek
Njoki s curry omako in arašidi
Polnozrnate testenine s pestom in češnjevim paradižnikom
Polpet v paradižnikovi omaki, pire krompir
Protein box iz bulgurja, tune in zelenjave, voda v plastenki
Njoki s šparglji in orehi
Dvojni polžki, bolones omaka,napitek
Pečen riž s piščancem in zelenjavo,napitek
Veganski paprikaš, dušen riž,voda v plastenki
Svaljki v smetanovi omaki s piščancem, napitek
Njoki z bučkami in gamberi, napitek
Sendvič s kuhanim pršutom in sirom, napitek
Grški sendvič z olivami, paradižnikom in feta sirom v polnozrnati štr., napitek, sadje
Mladi sir z zelišči v koruzni štručki, sladica, napitek
Domači skutni štruklji s suhim sadjem, napitek
Bulgur z zelenjavo in tuno,napitek
Sendvič s tuninim namazom in zeleno solato, napitek
Njoki s curry omako in arašidi
Dušena govedina v čebulni omaki, pire krompir
Polpet v paradižnikovi omaki, pire krompir
Sendvič z maslom in marmelado v beli mlečni štručki, napitek, sadje
Grški zavitek s feta sirom in špinačo, sadje, napitek
Pečen riž s piščancem in zelenjavo
Ješprenčkova rižota s teletino in korenčkom
Sendvič s tremi siri in svežo zelenjavo, voda v plastenki
Krompirjeva solata s kumarami, ocvrte ribje palčke, voda v plastenki
Kremna špinača, pire krompir, piščančja hrenovka
Kebab v štručki z jogurtovo omako
Mladi sir z zelišči v koruzni štručki, sladica, napitek
Ajdova kaša z jurčki
Sirovi kapileti v paradižnikovi omaki
Hot dog s piščančjo hrenovko pak. Majonezo in pak. Ketchupom, napitek
Sendvič s piščančjo posebno salamo, majoneznim namazom  in sirom, napitek
File postrvi z krompirjem in tržaško omako
Njoki z vegansko bolonese omako
Polnozrnate testenine s pestom in češnjevim paradižnikom
Ameriška solata, ocvrte mozzarelline palčke, voda v plastenki
Protein box iz bulgurja, tune in zelenjave, voda v plastenki
Njoki s šparglji in orehi
Grški zavitek s feta sirom in špinačo, sadje, napitek
Pečen riž s piščancem in zelenjavo
Zeljnata solata z  jajcem, fižolom in bučnim oljem, kruh, voda v plastenki
Sendvič s tremi siri in svežo zelenjavo, voda v plastenki
Mediteranska kvinoja, pečena mešana zelenjava, pečeni piščančji stripsi
Svaljki s šparglji in bučkami
Njoki z bučkami in gamberi
Pire krompir, kremna špinača, pečeno jajce(kuhano)
Krompirjev golaž s piščančjo hrenovko
Goveji trakci v gobovi omaki, pire krompir
Polnozrnati špageti z gobovo omako in rastlinskimi trakci z okusom govedine, napitek
Polnozrnata testeninska solata z zelenjavo, jajcem in chia semeni, voda v plastenki
Svinjski trakci s porovo omako, riž, napitek
Ješprenčkova rižota s teletino in korenčkom, napitek
Gurmanska ajdova kaša z gobicami, napite
Njoki s šparglji in orehi, voda v plastenki
Svaljki s piščancem v gobovi omaki, napitek
Sendvič z lososovim namazom in dimljenim sirom, napitek
Sendvič s piščančjo posebno salamo, majoneznim namazom in sirom, napitek
File postrvi s krompirjem, napitek
Njoki z gamberi in bučkami, voda v plastenki
Polnjene bučke s čičeriko in veganskim sirom, voda v plastenki
Pečen riž s piščancem in zelenjavo, napitek
Testeninska solata s tunino, voda v plastenki
Sočna solata s kus kusom, piščancem in zelenjavo, voda v plastenki
Testenine s tunino omako s sladko koruzo, napitek
Sendvič s pariško salamo, sirom in kislimi kumaricami, napitek
Pečen riž s piščancem in zelenjavo, napitek
Dušen riž, omaka s šparglji, voda v plastenki
Jufka piščančja, napitek
Polnozrnate testenine s s pestom in češnjevim paradižnikom, napitek
Goveje meso v porovi omaki, dušen riž, napitek
Tortilja s piščančjim mesom, napitek
Sendvič s puranjo šunko in sirom v sirovi štručki, sladica, napitek
Skutni štruklji s kremnim  piščančjim ragujem, napitek
Krompirjevi svaljki z bučkami in šparglji v smetanovi omaki, napitek
Kremni zelenjavni ragu s testeninami, voda v plastenki
Pečen riž s piščancem in zelenjavo, napitek
Špinačni rezanci s smetanovo omako, napitek
Sendvič s tuna namazom, s sladko koruzo in zeleno solato, napitek
Svinjska pečenka s praženim krompirjem, voda v plastenki
Njoki s šparglji in orehi, voda v plastenki
Široki rezanci, gobova omaka, napitek
Domači skutni štruklji s suhim sadjem, napitek


"""

menu=menu.split("\n")
menu=[i for i in menu if i!=""]

import random

menu=random.sample(menu, 10)
f=open("menu.txt", "w", encoding="utf-8")
for i in menu:
    f.write(i+"\n")
    