// --- FIREBASE CONFIGURATION START ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, collection, addDoc, query, onSnapshot, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAkp2_QCYY8-seRxpiKB5-KcpXUp6ZzU_E",
  authDomain: "prism-1-b3561.firebaseapp.com",
  projectId: "prism-1-b3561",
  storageBucket: "prism-1-b3561.firebasestorage.app",
  messagingSenderId: "277958247459",
  appId: "1:277958247459:web:631bbd580972ebe26f5d96"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// --- FIREBASE CONFIGURATION END ---
// ==========================================
// 🚚 CUSTOM TRUCK FLEET MASTER DIRECTORY (89)
// ==========================================
const fleetTrucks = [
    "000051-525-35",
    "000052-525-35",
    "000053-525-35",
    "000054-525-35",
    "000055-525-35",
    "000056-525-35",
    "000057-525-35",
    "000058-525-35",
    "000059-525-35",
    "000060-525-35",
    "000061-525-35",
    "000062-525-35",
    "000063-525-35",
    "000064-525-35",
    "000065-525-35",
    "000075-525-35",
    "000076-525-35",
    "000077-525-35",
    "000078-525-35",
    "000079-525-35",
    "000080-525-35",
    "000081-525-35",
    "000082-525-35",
    "000083-525-35",
    "000084-525-35",
    "000085-525-35",
    "000086-525-35",
    "000087-525-35",
    "000088-525-35",
    "000089-525-35",
    "000090-525-35",
    "000091-525-35",
    "000092-525-35",
    "000093-525-35",
    "000094-525-35",
    "000096-525-35",
    "000097-525-35",
    "000098-525-35",
    "000099-525-35",
    "000100-525-35",
    "000101-525-35",
    "000102-525-35",
    "000103-525-35",
    "000104-525-35",
    "000105-525-35",
    "000106-525-35",
    "000107-525-35",
    "000108-525-35",
    "000134-525-35",
    "00015-523-35",
    "00016-523-35",
    "00017-523-35",
    "00018-523-35",
    "00019-523-35",
    "00020-523-35",
    "00021-523-35",
    "00022-523-35",
    "00023-523-35",
    "00024-523-35",
    "00025-523-35",
    "00026-523-35",
    "00027-523-35",
    "00028-523-35",
    "00029-523-35",
    "00030-523-35",
    "00032-523-35",
    "00033-523-35",
    "00034-523-35",
    "00035-523-35",
    "00037-522-35",
    "00037-523-35",
    "00038-522-35",
    "00038-523-35",
    "00039-522-35",
    "00039-523-35",
    "00040-522-35",
    "00040-523-35",
    "00041-523-35",
    "00042-523-35",
    "00043-522-35",
    "00043-523-35",
    "00044-523-35",
    "00045-523-35",
    "00046-523-35"
];

// ==========================================
// 🏗️ REAL CONSTRUCTION SITE DIRECTORY (125) — from your manually-collected
// coordinates (decimal / DMS / plus-codes), geocoded and parsed.
// accuracy: "exact" (your provided coordinate) | "town" (fallback centroid)
// dupSuspect: true if this site shared an identical raw coordinate string
// with another site in your sheet — almost certainly a copy-paste slip,
// shown as a red marker on the map instead of amber so it's easy to spot.
// ==========================================
const constructionSites = [
    { id: "site_0", name: "Usine Amouda Ciment, C3P5+PFC, El Baida Ciment", client: "AMOUDA", lat: 34.4368063, lng: 2.058655, accuracy: "exact", dupSuspect: false },
    { id: "site_1", name: "A81 ADRAR", client: "SPA COSIDER OUVRAGE D'ART - A81 -", lat: 28.00419738888889, lng: -0.27131161111111113, accuracy: "exact", dupSuspect: false },
    { id: "site_2", name: "AFLOU - ATTIA", client: "ATTIA AMMAR", lat: 34.10024830555556, lng: 2.113269888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_3", name: "ZIRAKAM Aïn Oussara", client: "SARL ZIRAKAM BETON", lat: 35.4310875, lng: 2.9249219, accuracy: "exact", dupSuspect: false },
    { id: "site_4", name: "AIN OUSSARA - WAFA 3", client: "SARL WAFA DOUX", lat: 32.76838, lng: -0.6058406944444444, accuracy: "exact", dupSuspect: true },
    { id: "site_5", name: "Ain Sefra - NAAMA", client: "EURL GOUNEIBER TRAVAUX PUBLICS", lat: 32.76838, lng: -0.6058406944444444, accuracy: "exact", dupSuspect: true },
    { id: "site_6", name: "BENZAMIA DJELFA", client: "E.T.P BENZAMIA, DJELFA", lat: 34.69927119444444, lng: 3.254251111111111, accuracy: "exact", dupSuspect: false },
    { id: "site_7", name: "BETHIOUA ORAN", client: "SOCIETE SINOSTEEL ENGIEERING DESIGN RESEARCH INSTITUTE CO, LTD", lat: 35.76012938888889, lng: -0.2551961111111111, accuracy: "exact", dupSuspect: false },
    { id: "site_8", name: "BIR MOURAD RAIS", client: "SARL ASLAN CONSTRUCTION ET COMMERCE", lat: 36.72967661111111, lng: 3.034550611111111, accuracy: "exact", dupSuspect: false },
    { id: "site_9", name: "EMESA BOU HANIFIA", client: "SARL EMESA CONTRACT, BOU HANIFIA", lat: 35.29866669444444, lng: 0.05708330555555556, accuracy: "exact", dupSuspect: false },
    { id: "site_10", name: "LOUIFI BOUFARIK", client: "SARL LOUIFI PROJECTS", lat: 36.56638888888889, lng: 2.875805611111111, accuracy: "exact", dupSuspect: false },
    { id: "site_11", name: "BIG ROAD BOUGHEZOUL", client: "SARL BIG ROAD TRAVAUX PUBLICS ET HYDRAULIQUES Client 2198", lat: 35.75286111111111, lng: 2.8318888888888885, accuracy: "exact", dupSuspect: false },
    { id: "site_12", name: "CEDY BOUGHZOUL", client: "EURL CEDY ALGERIE BEST CONSTRUCTION", lat: 35.6954205, lng: 2.8887398055555553, accuracy: "exact", dupSuspect: false },
    { id: "site_13", name: "EMESA BOUIRA", client: "SARL EMESA CONTRACT", lat: 36.39066669444444, lng: 3.899055611111111, accuracy: "exact", dupSuspect: false },
    { id: "site_14", name: "BOUJLIDA / TLEMCEN", client: "SARL ABRAJ INJAZ, BOUJLIDA / TLEMCEN", lat: 34.92483330555555, lng: -1.3510833055555556, accuracy: "exact", dupSuspect: false },
    { id: "site_15", name: "BREZINA EL Bayaydh", client: "EURL ETB KHENCHALI ALI", lat: 33.07052312450835, lng: 1.2578355710510096, accuracy: "exact", dupSuspect: false },
    { id: "site_16", name: "CHAREF DJELFA", client: "SARL SOPREC , CHAREF DJELFA", lat: 34.62920511111111, lng: 2.812019111111111, accuracy: "exact", dupSuspect: false },
    { id: "site_17", name: "CHETIA CHLEF", client: "SARL WATER WAAPS ALGERIE", lat: 36.14170111111111, lng: 1.218974888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_18", name: "DJELFA GRANU CENTRE", client: "SPA SOCIETE DES GRANULATS D'ALGERIE SGA", lat: 34.65095588888889, lng: 3.254186388888889, accuracy: "exact", dupSuspect: false },
    { id: "site_19", name: "DJELFA SAID", client: "SOCIETE ALGERIENNE DE L'INNOVATION ET DU DEVELOPEMENT", lat: 34.560761694444444, lng: 3.2417226944444444, accuracy: "exact", dupSuspect: false },
    { id: "site_20", name: "El Affroun-Blida", client: "SPA ATLAS GENIE CIVIL COMPANY", lat: 36.44743111111111, lng: 2.6429658055555554, accuracy: "exact", dupSuspect: false },
    { id: "site_21", name: "W.G.A.M EL MENIA", client: "SARL W.G.A.M", lat: 30.482061805555553, lng: 2.9598751111111112, accuracy: "exact", dupSuspect: false },
    { id: "site_22", name: "TRAVOCOVIA EL MENIA", client: "SPA TRAVOCOVIA, EL MENIA", lat: 30.623277805555556, lng: 2.9762778055555557, accuracy: "exact", dupSuspect: false },
    { id: "site_23", name: "GDYEL", client: "COSIDER CANALISATION PÔLE C58, GDYEL", lat: 35.772733, lng: -0.433167, accuracy: "exact", dupSuspect: false },
    { id: "site_24", name: "HASSI DELAA", client: "EURL ETPBH S BOUZIDA/ E.T.B SARL OZGUR-SAN", lat: 33.29979980555555, lng: 3.4436785000000003, accuracy: "exact", dupSuspect: false },
    { id: "site_25", name: "Hassi R'mel", client: "SARL HYDRO DAMAS", lat: 33.138846888888885, lng: 3.3678446944444445, accuracy: "exact", dupSuspect: false },
    { id: "site_26", name: "ELBAYRAK HMD", client: "SARL ELBAYRAK CONSTRUCTION", lat: 32.36836838888889, lng: 5.833755388888888, accuracy: "exact", dupSuspect: false },
    { id: "site_27", name: "KOUBA", client: "SARL ASLAN CONSTRUCTION ET COMMERCE KOUBA Client 1788", lat: 36.71409930555556, lng: 3.0901476111111115, accuracy: "exact", dupSuspect: false },
    { id: "site_28", name: "LAGHOUAT - AIN MADI", client: "SARL Houria Services Client 1012", lat: 33.808511805555554, lng: 2.310091694444444, accuracy: "exact", dupSuspect: false },
    { id: "site_29", name: "LAGHOUAT - GRANU", client: "SPA SOCIETE DES GRANULATS D'ALGERIE SGA", lat: 33.752411611111114, lng: 2.893225388888889, accuracy: "exact", dupSuspect: false },
    { id: "site_30", name: "ZONE MILITAIRE LAGHOUAT SAID", client: "SOCIETE ALGERIENNE DE L'INNOVATION ET DU DEVELOPEMENT - S.A.I.D, SARL SAID- LAGHOUAT ZONE MILITAIRE", lat: 33.922993999999996, lng: 2.887265, accuracy: "exact", dupSuspect: false },
    { id: "site_31", name: "ZONE 2 LAGHOUAT SAID", client: "SOCIETE ALGERIENNE DE L'INNOVATION ET DU DEVELOPEMENT S.A.I.D, SARL SAID- LAGHOUAT MONTAGNE 2", lat: 33.83908538888889, lng: 2.8668531944444444, accuracy: "exact", dupSuspect: false },
    { id: "site_32", name: "MAGHNIA", client: "SARL ABRAJ INJAZ Client 1735", lat: 34.863063805555555, lng: -1.6967845, accuracy: "exact", dupSuspect: false },
    { id: "site_33", name: "MEDEA", client: "EURL BEZZIA TRAVAUX , MEDEA", lat: 36.199932999999994, lng: 3.042669, accuracy: "exact", dupSuspect: false },
    { id: "site_34", name: "MEKMEN BENAMAR NAAMA", client: "SARL DARKAOUI ET ASSOCIES", lat: 33.711358805555555, lng: -0.7181608055555556, accuracy: "exact", dupSuspect: false },
    { id: "site_35", name: "METLILI, GHARDAIA TCRHB", client: "EURL TCRHB", lat: 32.31204911111111, lng: 3.6643631111111112, accuracy: "exact", dupSuspect: false },
    { id: "site_36", name: "Houria NAAMA", client: "SARL Houria Services", lat: 33.27670769444445, lng: -0.32407319444444443, accuracy: "exact", dupSuspect: false },
    { id: "site_37", name: "ORAN - MOUILAH", client: "SARL MOUILAH DEVELOPEMENT", lat: 35.780543, lng: -0.3373766111111111, accuracy: "exact", dupSuspect: false },
    { id: "site_38", name: "OUARGLA - ASLAN", client: "SARL ASLAN CONSTRUCTION ET COMMERCE", lat: 32.06056061111111, lng: 5.581205194444444, accuracy: "exact", dupSuspect: false },
    { id: "site_39", name: "POLE H 67 ADRAR", client: "COSIDER CANALISATIONS POLE H 67 ADRAR, Projet : AGRECO", lat: 28.195303194444445, lng: 0.6853758888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_40", name: "ROUIBA - HKO", client: "HKO SARL HANNACHI KHEMISSA ET OTHMANI TRAVAUX PUBLIK", lat: 36.7184295, lng: 3.2924176944444445, accuracy: "exact", dupSuspect: false },
    { id: "site_41", name: "ELBAYRAK SAIDA", client: "SARL ELBAYRAK CONSTRUCTION", lat: 34.87401088888889, lng: 0.23928569444444445, accuracy: "exact", dupSuspect: false },
    { id: "site_42", name: "HASNAOUI SIDI BELABBES", client: "SPA HASNAOUI", lat: 35.1971235, lng: -0.596809, accuracy: "exact", dupSuspect: false },
    { id: "site_43", name: "SIDI MOUSSA", client: "SARL Houria Services", lat: 36.57016130555556, lng: 3.164816888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_44", name: "SIDI MOUSSA 2", client: "SARL Houria Services", lat: 36.63946696224355, lng: 3.1126468558221787, accuracy: "exact", dupSuspect: false },
    { id: "site_45", name: "TIGZIRT - D01", client: "COSIDER CANALISATIONS DO1", lat: 36.89997419444445, lng: 4.245788805555556, accuracy: "exact", dupSuspect: false },
    { id: "site_46", name: "*TISEMSILET - GBC*]", client: "GROUPE BOUROUAG CONSTRUCTION GBC", lat: 35.616635111111115, lng: 1.8149501111111113, accuracy: "exact", dupSuspect: false },
    { id: "site_47", name: "TISEMSILET - ELBAYREK", client: "SARL ELBAYRAK CONSTRUCTION, TISSEMSILT", lat: 35.607486305555554, lng: 1.861893888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_48", name: "ZERALDA", client: "CSCEC algerie 520 GPS Client 2151", lat: 36.73303669444444, lng: 2.867502, accuracy: "exact", dupSuspect: false },
    { id: "site_49", name: "EUCALYPTUS", client: "RESI BETON, LES EUCALYPTUS", lat: 36.643544, lng: 3.171515, accuracy: "exact", dupSuspect: false },
    { id: "site_50", name: "TINDOUF, GARA DJBILAT", client: "SOCIETE SINOSTEEL ENGIEERING DESIGN RESEARCH INSTITUTE CO, LTD/TINDOUF, GARA DJBILAT", lat: 26.738055, lng: -7.479836, accuracy: "exact", dupSuspect: false },
    { id: "site_51", name: "DJELFA AZZEDINE ET CHABANE", client: "SARL AZZEDINE ET CHABANE CONSTRUCTION, DJELFA", lat: 34.55199361111111, lng: 3.242396888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_52", name: "GRANULATS MASCARA", client: "SPA SOCIETE DES GRANULATS SGA - MASCARA", lat: 35.24056504080333, lng: 0.1501065, accuracy: "exact", dupSuspect: false },
    { id: "site_53", name: "ORAN - EMESA", client: "SARL EMESA CONTRACT, oran", lat: 35.6433295075278, lng: -0.6884521901852781, accuracy: "exact", dupSuspect: false },
    { id: "site_54", name: "GRANULA MOSTAGANEM", client: "GRANULA - SPA SGA - Mostaganem", lat: 35.93791688638589, lng: 0.13590395582217915, accuracy: "exact", dupSuspect: false },
    { id: "site_55", name: "DJELFA ZCIGC", client: "SARL ZCIGC CONSTRUCTION ALGERIE, DJELFA", lat: 34.6938125, lng: 3.3008125, accuracy: "exact", dupSuspect: false },
    { id: "site_56", name: "LAGHOUAT - HOURIA", client: "SARL Houria Services, BEIDHA, LAGHOUAT", lat: 33.7496875, lng: 2.8886875, accuracy: "exact", dupSuspect: false },
    { id: "site_57", name: "GBS TIARET", client: "EURL GBS ROUTE , tiaret", lat: 35.326144000000006, lng: 1.329879, accuracy: "exact", dupSuspect: false },
    { id: "site_58", name: "CHELF ATBM", client: "SARL ATBM BETON ET AGGLOMERES", lat: 36.1628595, lng: 1.5281332, accuracy: "exact", dupSuspect: false },
    { id: "site_59", name: "ORAN SBO", client: "SARL BETON ORAN - SBO, ORAN CHTAIBOU SBO", lat: 35.6539033, lng: -0.5560428, accuracy: "town", dupSuspect: false },
    { id: "site_60", name: "AIN SALAH", client: "COSIDER CANALISATION H 71 IN SALAH", lat: 27.769188888888888, lng: 2.628918611111111, accuracy: "exact", dupSuspect: false },
    { id: "site_61", name: "KHENCHALI LABYAD SIDI CHIKH", client: "EURL ETB KHENCHALI ALI, LABYAD SIDI CHIKH", lat: 32.916146, lng: 0.542796, accuracy: "exact", dupSuspect: false },
    { id: "site_62", name: "EMESA AIN OUSSARA", client: "SARL EMESA CONTRACT Client 1692", lat: 35.439287888888884, lng: 2.9547291111111114, accuracy: "exact", dupSuspect: false },
    { id: "site_63", name: "BENI ABBES /BECHAR R01", client: "COSIDER CANALISATION R 01 BECHAR", lat: 30.10708038888889, lng: -2.1930598888888886, accuracy: "exact", dupSuspect: false },
    { id: "site_64", name: "CSCEC - TINDOUF", client: "CSCEC PROJET TINDOUF hôpital 240 lits", lat: 27.64714738888889, lng: -8.143249611111111, accuracy: "exact", dupSuspect: false },
    { id: "site_65", name: "DAMOUS TIPAZA", client: "SPA COSIDER CANALISATION POLE H38", lat: 36.482240805555556, lng: 1.6658788055555556, accuracy: "exact", dupSuspect: false },
    { id: "site_66", name: "TINDOUF COSIDER A 79", client: "COSIDER POLE A 79 TINDOUF", lat: 27.7526975, lng: -8.17048161111111, accuracy: "exact", dupSuspect: false },
    { id: "site_67", name: "*EL OUANCHARISE TISEMSILET*]", client: "SARL EL OUANCHARISE LI TOROQAT", lat: 35.63323538888889, lng: 1.9587001944444444, accuracy: "exact", dupSuspect: false },
    { id: "site_68", name: "ABRAJ MOSTAGANEM", client: "SARL ABRAJ INJAZ Client 1735", lat: 35.741416694444446, lng: -0.05686111111111111, accuracy: "exact", dupSuspect: true },
    { id: "site_69", name: "GRANULATS SIDI BEL ABBES", client: "SPA SOCIETE DES GRANULATS SGA-SIDI BEL ABBES", lat: 35.741416694444446, lng: -0.05686111111111111, accuracy: "exact", dupSuspect: true },
    { id: "site_70", name: "ABRAJ INJAZ, TIARET", client: "SARL ABRAJ INJAZ, TIARET", lat: 35.381283805555555, lng: 1.3662645, accuracy: "exact", dupSuspect: false },
    { id: "site_71", name: "FAUCON BLEU ADRAR", client: "SARL FAUCON BLEU, Adrar", lat: 26.76570438888889, lng: 0.1327986111111111, accuracy: "exact", dupSuspect: false },
    { id: "site_72", name: "GCB ARZEW", client: "GCB DRO, MTBE ARZEW, ORAN", lat: 35.830419500000005, lng: -0.33602580555555556, accuracy: "exact", dupSuspect: false },
    { id: "site_73", name: "HYDRO GHARDAIA", client: "SNC HYDRO TRAV HABIB ET ASSOCIES", lat: 32.43442169444444, lng: 3.7172263055555557, accuracy: "exact", dupSuspect: false },
    { id: "site_74", name: "HAD SAHARY DJELFA", client: "KOUICI ZAKARIA", lat: 35.34521319444445, lng: 3.3458626944444445, accuracy: "exact", dupSuspect: false },
    { id: "site_75", name: "DJELFA MOLAY EL HACEN", client: "SARL BY MOULAY EL HACEN, zone industrielle de DJELFA", lat: 34.64224430555556, lng: 3.245249305555556, accuracy: "exact", dupSuspect: false },
    { id: "site_76", name: "M'SILA A83", client: "COSIDER OUVRAGE D'ART PÖLE A83 Client 2119", lat: 35.68460661111111, lng: 4.731675888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_77", name: "BELTEK NAAMA", client: "SARL BELTEK", lat: 33.2878, lng: -0.309569, accuracy: "exact", dupSuspect: false },
    { id: "site_78", name: "HASSI BAHBAH", client: "SPA INFRARAIL, HASSI BAHBAH INFRARAIL", lat: 35.04578961111111, lng: 3.0470915, accuracy: "exact", dupSuspect: false },
    { id: "site_79", name: "SAIDA - DEBO", client: "SARL DEBO TRAVAUX,SAIDA", lat: 34.858024, lng: 0.19744799999999998, accuracy: "exact", dupSuspect: false },
    { id: "site_80", name: "TINDOUF - A 91", client: "COSIDER OUVRAGE D'ART A 91 TNDOUF", lat: 28.54208161111111, lng: -7.451935, accuracy: "exact", dupSuspect: false },
    { id: "site_81", name: "AZZEDINE ET CHABANE SIDI NAAMANE", client: "SARL AZZEDINE ET CHABANE CONSTRUCTION, SIDI NAAMANE", lat: 36.754987388888885, lng: 4.033146194444444, accuracy: "exact", dupSuspect: false },
    { id: "site_82", name: "INFRARAIL ROUIBA", client: "INFRARAIL SPA ROUIBA", lat: 36.73167155821724, lng: 3.283718847275816, accuracy: "exact", dupSuspect: false },
    { id: "site_83", name: "BENMOUSSA ABDELKADER SAIDA", client: "BENMOUSSA ABDELKADER, GÉNÉRAL CONCRETE ALGERIA Saida", lat: 34.76639461111111, lng: 0.15590888888888887, accuracy: "exact", dupSuspect: false },
    { id: "site_84", name: "EQUIPE2 BOUDOUAOU - CSCEC", client: "SPA CSCEC (BOUDOUAOU 2500 LOGTS SITE 2)", lat: 36.700435694444444, lng: 3.4320649999999997, accuracy: "exact", dupSuspect: false },
    { id: "site_85", name: "BOUDOUAOU ASLAN", client: "SARL ASLAN CONSTRUCTION ET COMMERCE, AADL 2500 LOGT BOUDOUAOU", lat: 36.70538938888889, lng: 3.4392196111111115, accuracy: "exact", dupSuspect: false },
    { id: "site_86", name: "GREAT WALL HMD", client: "GREAT WALL DRILLING COMPANY, greatwall drilling company route Ain amenas , Base TSP IRARA HASSI MESSAOUD OUARGLA", lat: 31.6175375, lng: 6.1642344, accuracy: "exact", dupSuspect: false },
    { id: "site_87", name: "CHIALI EL MENIA", client: "SPA CHIALI SERVICES, EL MENIA CHIALI", lat: 30.591940805555556, lng: 2.9672956944444446, accuracy: "exact", dupSuspect: false },
    { id: "site_88", name: "Equipe 1 BOUDOUAOU - CSCEC", client: "SPA CSCEC ALGERIE (Boumerdes 2500 LOGTS site05 Equipe 1), BOUDOUAOU", lat: 36.70052780555556, lng: 3.4324999999999997, accuracy: "exact", dupSuspect: false },
    { id: "site_89", name: "BETHIOUA ORAN SBO", client: "SARL BETON ORAN - SBO, ORAN BETHIOUA SBO", lat: 35.78469438888889, lng: -0.28327780555555554, accuracy: "exact", dupSuspect: false },
    { id: "site_90", name: "ZCIGC - OUARGLA", client: "SARL ZCIGC CONSTRUCTION ALGERIE -OUARGLA-, ZCIGC - OUARGLA", lat: 31.9208085, lng: 5.455820305555556, accuracy: "exact", dupSuspect: false },
    { id: "site_91", name: "Aïn Bouchekif", client: "SNC IGAM", lat: 35.365215566512916, lng: 1.5035169288355639, accuracy: "exact", dupSuspect: false },
    { id: "site_92", name: "Telemcen D02", client: "COSIDER CANALISATION -Pôle D02-, TLEMCEN", lat: 35.077555611111116, lng: -2.1043333055555555, accuracy: "exact", dupSuspect: false },
    { id: "site_93", name: "COSIDER / BOUGHEZOULA30-01", client: "cosider ouvrage d'art pôle A 30-01 Boughezoul- Médéa .", lat: 35.685390929284885, lng: 2.8095239959329303, accuracy: "exact", dupSuspect: false },
    { id: "site_94", name: "BOUFARIK, BLIDA CMH", client: "C M H BETON, BOUFARIK, BLIDA", lat: 36.56943069444445, lng: 2.8677420000000002, accuracy: "exact", dupSuspect: false },
    { id: "site_95", name: "EL EULMA", client: "EURL CECEG ALGERIE", lat: 36.121124, lng: 5.827872, accuracy: "exact", dupSuspect: false },
    { id: "site_96", name: "GUELMA", client: "EURL CRCEG ALGERIE", lat: 36.457108500000004, lng: 7.530864194444445, accuracy: "exact", dupSuspect: false },
    { id: "site_97", name: "JIJEL", client: "EURL CRCEG ALGERIE", lat: 36.82386519444445, lng: 5.925199500000001, accuracy: "exact", dupSuspect: false },
    { id: "site_98", name: "SOUMAA -BOUFARIK", client: "SARL ACTCE LOKMANE Client 2139", lat: 36.520179694444444, lng: 2.9199805, accuracy: "exact", dupSuspect: false },
    { id: "site_99", name: "BETON HAMDAOUI", client: "SARL BETON HAMDAOUI SBH", lat: 35.501342888888885, lng: -0.5998995, accuracy: "exact", dupSuspect: false },
    { id: "site_100", name: "Hassi ameur", client: "SARL ELBAYRAK CONSTRUCTION", lat: 35.7007875, lng: -0.4864531, accuracy: "exact", dupSuspect: false },
    { id: "site_101", name: "GRANULATS AIN TEMOUCHENT", client: "SPA SOCIETE DES GRANULATS D'ALGERIE SGA - BPE AIN TEMOUCHENT", lat: 35.3085875, lng: -1.1189219, accuracy: "exact", dupSuspect: false },
    { id: "site_102", name: "Laghouat BERRARMA MABROUK", client: "BERRARMA MABROUK Laghouat", lat: 33.762, lng: 2.881073, accuracy: "exact", dupSuspect: false },
    { id: "site_103", name: "BEN KOUIDER MESSAAD, DJELFA", client: "BENKOUIDER RACHID , BEN KOUIDER MESSAAD, DJELFA", lat: 34.157593663195506, lng: 3.464795740479922, accuracy: "exact", dupSuspect: false },
    { id: "site_104", name: "M’Guiden – Timimoun", client: "COSIDER CANALISATION POLE L10 NT401 IN SALAH, M’Guiden – Timimoun", lat: 29.85238888888889, lng: 1.4735, accuracy: "exact", dupSuspect: false },
    { id: "site_105", name: "BECHAR A90", client: "SPA COSIDER OUVRAGES D'ART - POLE A 90 - BECHAR", lat: 31.708848305555556, lng: -2.117974888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_106", name: "ELBAYRAK Oran", client: "SARL ELBAYRAK CONSTRUCTION, Oran", lat: 35.620948, lng: -0.7125946944444443, accuracy: "exact", dupSuspect: false },
    { id: "site_107", name: "HASSI MESSAOUD", client: "SPA COSIDER CANALISATION - PÔLE L 12, HASSI MESSAOUD POLE L 12", lat: 31.58328788888889, lng: 6.1903615, accuracy: "exact", dupSuspect: false },
    { id: "site_108", name: "TABAINET BETOBAG", client: "SARL BETOBAG, TABAINET BETOBAG", lat: 36.5186375, lng: 3.0657969, accuracy: "exact", dupSuspect: false },
    { id: "site_109", name: "ORAN HARBOUR", client: "SARL CHINA HARBOUR ALGERIE, PROJET REALISATION BATIMENT R+2 Marsa elkebir", lat: 35.7175375, lng: -0.6967344, accuracy: "exact", dupSuspect: false },
    { id: "site_110", name: "TINDOUF", client: "COSIDER CANALISATION POLE H 70-Tindouf, TINDOUF", lat: 27.610844, lng: -8.109638, accuracy: "exact", dupSuspect: false },
    { id: "site_111", name: "ADRAR", client: "EURL CRCEG ALGERIE, PROJET BALADNA", lat: 27.550399694444444, lng: 0.1681601111111111, accuracy: "exact", dupSuspect: false },
    { id: "site_112", name: "COSIDER / BOUGHEZOULA30", client: "cosider ouvrage d'art pôle A 30 Boughezoul- Médéa .", lat: 35.800984388888885, lng: 2.775844388888889, accuracy: "exact", dupSuspect: false },
    { id: "site_113", name: "CSCEC HADJOUT", client: "CHINA STATE CONSTRUCTION ENGINEERING CORPORATION LIMITED CHINE - HADJOUT,CSCEC - PROJET / ETUDE ET REALISATION D4UN PROJET D'INFRASTRUCTURE", lat: 36.5219375, lng: 2.351284111111111, accuracy: "exact", dupSuspect: false },
    { id: "site_114", name: "TIMIMOUNE", client: "SARL TIMBAT, TIMIMOUNE", lat: 29.26125, lng: 0.24783330555555555, accuracy: "exact", dupSuspect: false },
    { id: "site_115", name: "BENI TAMOU", client: "SARL SKN INTERNATIONAL - BENI TAMOU", lat: 36.52794438888889, lng: 2.8293888888888885, accuracy: "exact", dupSuspect: false },
    { id: "site_116", name: "AADL MEDEA", client: "SARL ABRAJ INJAZ", lat: 36.27999480555555, lng: 2.7119796111111114, accuracy: "exact", dupSuspect: false },
    { id: "site_117", name: "MEFTAH BLIDA", client: "SARL ASLAN CONSTRUCTION ET COMMERCE", lat: 36.58078869444445, lng: 3.1928278888888886, accuracy: "exact", dupSuspect: false },
    { id: "site_118", name: "BENI ABBES /BECHAR A76-01", client: "COSIDER OUVRAGE D'ART POLE A76-01", lat: 29.775805194444445, lng: -4.012649888888889, accuracy: "exact", dupSuspect: false },
    { id: "site_119", name: "A76 EL EUGLA, BECHAR", client: "COSIDER OUVRAGE D'ART POLE A 76", lat: 30.367189694444445, lng: -3.582508, accuracy: "exact", dupSuspect: false },
    { id: "site_120", name: "ABADLA, BECHAR A71", client: "COSIDER OURVRAGE D'ART A71", lat: 30.967233388888886, lng: -2.7734908055555554, accuracy: "exact", dupSuspect: false },
    { id: "site_121", name: "PORT ARZEW", client: "SARL CHINA HARBOUR ALGERIE CHEC Client 1982", lat: 35.846684611111115, lng: -0.3086831944444444, accuracy: "exact", dupSuspect: false },
    { id: "site_122", name: "RAHMANIA", client: "SARL ASLAN CONSTRUCTION ET COMMERCE Client 1788", lat: 36.65749119444444, lng: 2.9081858888888887, accuracy: "exact", dupSuspect: false },
    { id: "site_123", name: "Si Mustapha - BOUMERDES", client: "GCB DRC", lat: 36.725947500000004, lng: 3.594292194444445, accuracy: "exact", dupSuspect: false },
    { id: "site_124", name: "SAIDA2", client: "SARL ELBAYRAK CONSTRUCTION", lat: 34.76361169444444, lng: 0.15986999999999998, accuracy: "exact", dupSuspect: false }
];
// 🏭 FACTORY COORDINATES (Usine Amouda Ciment, El Baida) — verified business listing
const AMOUDA_COORDS = [34.4368063, 2.058655];

// How far (meters) a pasted position can sit from the calculated road route
// before it's flagged as a deviation. OSRM's route line is a real driving
// path, not the highway centerline, so a few hundred meters of slack is
// normal — tighten this if you want stricter alerts.
let ROUTE_BUFFER_METERS = 400;

// A truck within this many meters of a geofence EDGE (but not technically
// inside yet) still counts as "arrived" — accounts for normal GPS noise so
// a truck sitting right at the boundary isn't missed on a technicality.
const FACTORY_ZONE_EDGE_BUFFER_METERS = 150;

// Fallback arrival buffer for sites WITHOUT a matched KML geofence — tighter
// than the factory's since client sites are usually a single point, not a
// whole waiting-yard area.
let SITE_ARRIVAL_BUFFER_METERS = 300;

// Speed limit for drivers — anything above this on an active run counts as
// a speeding violation, factored into driver ratings alongside deviations.
let SPEED_LIMIT_KMH = 90;

// How often (ms) to auto-check truck positions when notifications/live
// tracking are enabled. Kept fairly infrequent to be gentle on the free relay.
let POLL_INTERVAL_MS = 60 * 1000;

// ---------------------------------------------------------------
// GEOFENCES — general store, not just the factory. Each entry:
// { id, name, kind: 'factory' | 'site', polygon: [[lat,lng], ...], layer }
// Loaded from real KML exports (yours, pasted/uploaded), not guessed.
// ---------------------------------------------------------------
let geofences = [
    {
        id: 'factory',
        name: "Zone d'attente – Usine AMOUDA Ciment",
        kind: 'factory',
        polygon: [
            [34.4505353635, 2.0633263065],
            [34.4382014323, 2.0456678955],
            [34.4253878741, 2.0600874511],
            [34.437511332, 2.078475423]
        ],
        layer: null
    }
];

function isNearGeofence(point, geofence) {
    if (pointInPolygon(point, geofence.polygon)) return true;
    return distanceToPolygonBoundaryMeters(point, geofence.polygon) <= FACTORY_ZONE_EDGE_BUFFER_METERS;
}

// Parses one KML document's <Placemark> entries into {name, polygon} zones.
// A single KML can contain multiple placemarks/polygons, so this returns an array.
function parseKmlGeofences(kmlText) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(kmlText, 'text/xml');
    const parseError = doc.querySelector('parsererror');
    if (parseError) throw new Error('Invalid KML/XML — could not parse the file.');

    const placemarks = Array.from(doc.getElementsByTagName('Placemark'));
    if (placemarks.length === 0) throw new Error('No <Placemark> zones found in this file.');

    const results = [];
    placemarks.forEach((pm, idx) => {
        const nameEl = pm.getElementsByTagName('name')[0];
        const name = nameEl ? nameEl.textContent.trim() : `Zone ${idx + 1}`;
        const coordsEl = pm.getElementsByTagName('coordinates')[0];
        if (!coordsEl) return; // skip placemarks with no shape (e.g. folders)

        const raw = coordsEl.textContent.trim();
        const points = raw.split(/\s+/).filter(Boolean).map(triplet => {
            const [lon, lat] = triplet.split(',').map(Number);
            return [lat, lon];
        }).filter(p => !isNaN(p[0]) && !isNaN(p[1]));

        // Drop the closing duplicate point KML always repeats
        if (points.length > 1 &&
            points[0][0] === points[points.length - 1][0] &&
            points[0][1] === points[points.length - 1][1]) {
            points.pop();
        }

        if (points.length >= 3) {
            results.push({ name, polygon: points });
        }
    });

    if (results.length === 0) throw new Error('Found placemarks, but none had usable polygon coordinates.');
    return results;
}

function addGeofence(name, polygon, kind = 'site', siteId = null) {
    const id = 'geo_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    const entry = { id, name, kind, polygon, siteId, layer: null };
    geofences.push(entry);
    if (map) drawGeofenceLayer(entry);

    // The polygon is more accurate than the point-based dot — hide the dot
    // for this site so it doesn't look duplicated/cluttered on the map.
    if (siteId && siteMarkers[siteId] && siteClusterGroup) {
        siteClusterGroup.removeLayer(siteMarkers[siteId]);
    }
    return entry;
}

function drawGeofenceLayer(entry) {
    const color = entry.kind === 'factory' ? '#6d5bff' : '#ffb703';
    entry.layer = L.polygon(entry.polygon, {
        color, weight: 2, fillColor: color, fillOpacity: 0.10
    }).bindPopup(`<b>${entry.kind === 'factory' ? '🏭' : '📍'} ${entry.name}</b>`);
    if (geofencesLayerVisible) entry.layer.addTo(map);
}

function removeGeofence(id) {
    const idx = geofences.findIndex(g => g.id === id);
    if (idx === -1) return;
    const removed = geofences[idx];
    if (removed.layer && map) map.removeLayer(removed.layer);
    geofences.splice(idx, 1);

    // Restore the point-dot fallback now that this site has no polygon
    if (removed.siteId && siteMarkers[removed.siteId] && siteClusterGroup && geofencesLayerVisible) {
        siteClusterGroup.addLayer(siteMarkers[removed.siteId]);
    }
    renderGeofenceList();
}

function toggleGeofenceLayerVisibility(show) {
    // Covers both uploaded geofence polygons AND the point-based site dots —
    // "Zones" should mean "all destination site markers", not just the one
    // polygon that happens to be loaded.
    geofences.forEach(g => {
        if (!g.layer) return;
        if (show && !map.hasLayer(g.layer)) g.layer.addTo(map);
        if (!show && map.hasLayer(g.layer)) map.removeLayer(g.layer);
    });
    const sitesWithPolygon = new Set(geofences.filter(g => g.siteId).map(g => g.siteId));
    Object.entries(siteMarkers).forEach(([siteId, marker]) => {
        if (sitesWithPolygon.has(siteId)) return; // this site's dot stays hidden — its polygon is the authoritative shape
        if (show && !siteClusterGroup.hasLayer(marker)) siteClusterGroup.addLayer(marker);
        if (!show && siteClusterGroup.hasLayer(marker)) siteClusterGroup.removeLayer(marker);
    });
}

// ---------------------------------------------------------------
// ZONE-TO-SITE MATCHING — your Wialon account has 500+ zones (many
// stale/old clients); we only want the ones that correspond to your
// current 125-site list from constructionSites, not everything Wialon has.
// ---------------------------------------------------------------
function normalizeForMatch(s) {
    return (s || '')
        .toUpperCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents (é, è, ï, etc.)
        .replace(/[^A-Z0-9]+/g, ' ')
        .trim();
}

const MATCH_SCORE_THRESHOLD = 40;

function matchZoneToSite(zoneName) {
    const normZone = normalizeForMatch(zoneName);
    if (!normZone) return null;

    let best = null;
    let bestScore = 0;

    constructionSites.forEach(site => {
        if (site.id === 'site_0') return; // skip the factory entry
        const normSiteName = normalizeForMatch(site.name);
        const normClient = normalizeForMatch(site.client);

        let score = 0;
        if (normZone === normSiteName) {
            score = 100;
        } else if (normSiteName && (normZone.includes(normSiteName) || normSiteName.includes(normZone))) {
            score = 80;
        } else if (normClient && (normZone.includes(normClient) || normClient.includes(normZone))) {
            score = 60;
        } else {
            // Fallback: how many significant words overlap (ignores short/common tokens)
            const zoneWords = new Set(normZone.split(' ').filter(w => w.length > 2));
            const siteWords = new Set(normSiteName.split(' ').filter(w => w.length > 2));
            const overlap = [...zoneWords].filter(w => siteWords.has(w)).length;
            if (overlap > 0 && siteWords.size > 0) {
                score = Math.round((overlap / siteWords.size) * 50);
            }
        }

        if (score > bestScore) {
            bestScore = score;
            best = site;
        }
    });

    return bestScore >= MATCH_SCORE_THRESHOLD ? { site: best, score: bestScore } : null;
}

// Detects zones that belong to YOUR factory specifically. Matters because
// KML exports can span multiple companies' data (e.g. this account also has
// "CIMENTRIE LAFARGE" client zones mixed in, which are NOT yours) — so we
// only treat something as a factory zone if it names Amouda and not a
// different cement company's plant.
function looksLikeOwnFactoryZone(zoneName) {
    const norm = normalizeForMatch(zoneName);
    if (!norm.includes('AMOUDA')) return false;
    if (norm.includes('LAFARGE')) return false; // different company's plant
    if (norm.includes('CLIENT')) return false; // a client zone, not the factory itself
    return norm.includes('USINE');
}

// Processes a batch of parsed KML zones: keeps factory zones (yours only)
// and ones that match a real site, skips the rest (so 500+ Wialon zones —
// including a different company's data mixed into the same export — don't
// all turn into map markers).
function ingestGeofenceZones(zones) {
    const matched = [];
    const matchedFactory = [];
    const skippedDuplicates = [];
    const unmatched = [];

    zones.forEach(z => {
        const alreadyExists = geofences.some(g => normalizeForMatch(g.name) === normalizeForMatch(z.name));
        if (alreadyExists) {
            skippedDuplicates.push(z.name);
            return;
        }

        if (looksLikeOwnFactoryZone(z.name)) {
            addGeofence(z.name, z.polygon, 'factory');
            matchedFactory.push(z.name);
            return;
        }

        const result = matchZoneToSite(z.name);
        if (result) {
            addGeofence(z.name, z.polygon, 'site', result.site.id);
            matched.push({ zoneName: z.name, siteName: result.site.name, score: result.score });
        } else {
            unmatched.push(z.name);
        }
    });

    return {
        matchedCount: matched.length,
        matchedFactoryCount: matchedFactory.length,
        duplicateCount: skippedDuplicates.length,
        totalCount: zones.length,
        matched, matchedFactory, unmatched
    };
}

// ---------------------------------------------------------------
// GEOMETRY HELPERS — distance from a point to a polyline (the route)
// ---------------------------------------------------------------
function haversineMeters(lat1, lon1, lat2, lon2) {
    const R = 6371000;
    const toRad = d => d * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.asin(Math.sqrt(a));
}

// Closest point on segment A-B to point P, treating lat/lng as locally flat
// (fine at the segment lengths OSRM produces — tens to low hundreds of meters)
function closestPointOnSegment(p, a, b) {
    const [px, py] = p, [ax, ay] = a, [bx, by] = b;
    const dx = bx - ax, dy = by - ay;
    const lenSq = dx * dx + dy * dy;
    if (lenSq === 0) return a;
    let t = ((px - ax) * dx + (py - ay) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    return [ax + t * dx, ay + t * dy];
}

// Returns the minimum distance (meters) from [lat,lng] to a route polyline
// (array of [lat,lng] points, as returned by the routing engine).
// Projects `point` onto the route polyline: returns the distance from the
// point to the nearest spot on the road, PLUS how far along the route
// (in meters, from the start) that nearest spot is — the second part is
// what lets us calculate "distance remaining" for an ETA.
function projectPointOntoRoute(point, routeLine) {
    if (!routeLine || routeLine.length < 2) return null;
    let minDist = Infinity;
    let cumulativeAtClosest = 0;
    let cumulative = 0;
    for (let i = 0; i < routeLine.length - 1; i++) {
        const a = routeLine[i], b = routeLine[i + 1];
        const segLen = haversineMeters(a[0], a[1], b[0], b[1]);
        const closest = closestPointOnSegment(point, a, b);
        const d = haversineMeters(point[0], point[1], closest[0], closest[1]);
        if (d < minDist) {
            minDist = d;
            cumulativeAtClosest = cumulative + haversineMeters(a[0], a[1], closest[0], closest[1]);
        }
        cumulative += segLen;
    }
    return { distanceToRoute: minDist, distanceCovered: cumulativeAtClosest, totalRouteLength: cumulative };
}

function distanceToRouteMeters(point, routeLine) {
    const proj = projectPointOntoRoute(point, routeLine);
    return proj ? proj.distanceToRoute : null;
}

// Standard ray-casting point-in-polygon test. `polygon` is an array of
// [lat, lng] pairs (closing edge back to the first point is implicit).
function pointInPolygon(point, polygon) {
    const [py, px] = point; // using [lat,lng] -> treat lat as y, lng as x, consistently
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const yi = polygon[i][0], xi = polygon[i][1];
        const yj = polygon[j][0], xj = polygon[j][1];
        const intersect = ((yi > py) !== (yj > py)) &&
            (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

// Minimum distance (meters) from a point to a polygon's boundary edges,
// including the closing edge from the last vertex back to the first.
function distanceToPolygonBoundaryMeters(point, polygon) {
    let min = Infinity;
    for (let i = 0; i < polygon.length; i++) {
        const a = polygon[i];
        const b = polygon[(i + 1) % polygon.length];
        const closest = closestPointOnSegment(point, a, b);
        const d = haversineMeters(point[0], point[1], closest[0], closest[1]);
        if (d < min) min = d;
    }
    return min;
}

// Typical average speed (km/h) assumed only when OSRM's own route timing
// isn't available (fallback straight-line mode) — used purely to give a
// rough ETA rather than nothing. When route geometry IS available, the
// ETA instead uses OSRM's actual predicted speed for that specific route.
const FALLBACK_AVG_SPEED_KMH = 65;

function formatDuration(totalSeconds) {
    if (totalSeconds == null || !isFinite(totalSeconds) || totalSeconds < 0) return '—';
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.round((totalSeconds % 3600) / 60);
    if (h === 0) return `${m} min`;
    return `${h}h ${m}min`;
}

// ==========================================
// ⚙️ ENGINE STATE
// ==========================================
let map, routingControl;
let siteClusterGroup, truckClusterGroup;
let activeRuns = {};      // truckId -> { siteId, siteName, client, marker, dispatchedAt, lastVerifiedAt, lastCoords, routeLine }
let selectedTrucks = new Set();
let masterSiteOptions = [];
let tileLayers = {};
let currentBaseLayerName = 'dark';
let geofencesLayerVisible = true;
let driverNamesVisible = true;

window.onload = function () {
    // UI wiring happens first and unconditionally — if the map/tile library
    // fails to load (flaky network, blocked CDN, etc.) the dropdowns, search,
    // and convoy builder still work. A prior version initialized everything
    // in one block, so a single Leaflet load failure silently broke every
    // control on the page with no visible error.
    try {
        populateSiteDropdown();
        renderTruckList('');
        wireTopLevelControls();
        setupNotificationToggle();
        setupThemeToggle();
		setupSettingsControls();
(function(){ let saved=null; try{ saved = localStorage.getItem('omd_lang'); }catch(e){} if(saved && I18N[saved]) currentLang = saved; applyI18n(); })();
        setupLiveFleetControls();
        setupGeofenceControls();
        setupDispatchQueueControls();
        setupHistoryControls();
        setupDashboardControls();
        setupNotificationsLogControls();
        setupMonitoringControls();
        const soundBtn = document.getElementById('sound-toggle-btn');
        if (soundBtn) soundBtn.addEventListener('click', toggleSoundAlerts);
        updateStatsDisplays();
        renderFleetTable();
    } catch (err) {
        showFatalError('The interface failed to load correctly: ' + err.message);
        console.error(err);
        return;
    }

    try {
        if (typeof L === 'undefined') {
            throw new Error('Mapping library did not load.');
        }
        initMap();
        plotConstructionSites();
    } catch (err) {
        showMapError('Map failed to load — the dispatch form still works, but the map is unavailable. (' + err.message + ')');
        console.error(err);
    }
};

function showFatalError(message) {
    const banner = document.createElement('div');
    banner.style.cssText = 'position:fixed; top:0; left:0; right:0; background:#f87171; color:#1a0000; padding:12px 20px; font-family:sans-serif; font-weight:600; z-index:9999;';
    banner.textContent = '⚠️ ' + message;
    document.body.prepend(banner);
}

function showMapError(message) {
    const mapEl = document.getElementById('map-viewport');
    if (mapEl) {
        mapEl.innerHTML = `<div style="display:flex; align-items:center; justify-content:center; height:100%; color:#8f8fb0; font-family:sans-serif; padding:40px; text-align:center;">⚠️ ${message}<br><span style="font-size:.8rem; margin-top:8px; display:block;">Try refreshing the page once you have a stable connection.</span></div>`;
    }
}

// ---------------------------------------------------------------
// MAP
// ---------------------------------------------------------------
function initMap() {
    map = L.map('map-viewport', { zoomControl: true }).setView([35.2500, 3.0000], 7);

    tileLayers.dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    });

    tileLayers.satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri, Maxar, Earthstar Geographics',
        maxZoom: 19
    });

    tileLayers[currentBaseLayerName].addTo(map);

    // Clustering keeps the map readable at low zoom with 84 trucks + 125+
    // site markers all potentially on screen at once — nearby markers
    // collapse into a single numbered bubble until you zoom in.
    siteClusterGroup = L.markerClusterGroup({
        maxClusterRadius: 50,
        iconCreateFunction: (cluster) => L.divIcon({
            html: `<div class="cluster-bubble cluster-site">${cluster.getChildCount()}</div>`,
            className: '', iconSize: [34, 34]
        })
    }).addTo(map);

    truckClusterGroup = L.markerClusterGroup({
        maxClusterRadius: 45,
        iconCreateFunction: (cluster) => L.divIcon({
            html: `<div class="cluster-bubble cluster-truck">${cluster.getChildCount()}</div>`,
            className: '', iconSize: [34, 34]
        })
    }).addTo(map);

    L.marker(AMOUDA_COORDS, {
        icon: L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/2689/2689947.png',
            iconSize: [32, 32],
            iconAnchor: [16, 32]
        })
    }).addTo(map).bindPopup("<b>🏭 Usine Amouda Ciment</b><br>Loading base — El Baida");

    geofences.forEach(g => drawGeofenceLayer(g));

    setupLayerToggle();
}

function setupLayerToggle() {
    const darkBtn = document.getElementById('layer-btn-dark');
    const satBtn = document.getElementById('layer-btn-satellite');
    const geoBtn = document.getElementById('layer-btn-geofences');
    if (!darkBtn || !satBtn) return;

    darkBtn.addEventListener('click', () => switchBaseLayer('dark'));
    satBtn.addEventListener('click', () => switchBaseLayer('satellite'));
    updateLayerToggleUI();

    if (geoBtn) {
        geoBtn.addEventListener('click', () => {
            geofencesLayerVisible = !geofencesLayerVisible;
            toggleGeofenceLayerVisibility(geofencesLayerVisible);
            geoBtn.classList.toggle('active', geofencesLayerVisible);
        });
    }

    const namesBtn = document.getElementById('layer-btn-names');
    if (namesBtn) {
        namesBtn.addEventListener('click', () => {
            driverNamesVisible = !driverNamesVisible;
            document.getElementById('map-viewport').classList.toggle('hide-driver-names', !driverNamesVisible);
            namesBtn.classList.toggle('active', driverNamesVisible);
        });
    }
}

function switchBaseLayer(name) {
    if (name === currentBaseLayerName || !tileLayers[name]) return;
    map.removeLayer(tileLayers[currentBaseLayerName]);
    tileLayers[name].addTo(map);
    currentBaseLayerName = name;
    updateLayerToggleUI();
}

function updateLayerToggleUI() {
    const darkBtn = document.getElementById('layer-btn-dark');
    const satBtn = document.getElementById('layer-btn-satellite');
    if (!darkBtn || !satBtn) return;
    darkBtn.classList.toggle('active', currentBaseLayerName === 'dark');
    satBtn.classList.toggle('active', currentBaseLayerName === 'satellite');
}

let siteMarkers = {}; // siteId -> L.marker (the amber dot), so we can hide it when a real geofence upgrades that site

function plotConstructionSites() {
    constructionSites.forEach(site => {
        if (site.id === 'site_0') return; // the factory itself
        if (site.lat == null || site.lng == null) return;
        const isApprox = site.accuracy === 'town';
        const isSuspect = site.dupSuspect === true;
        let cls = 'site-glow-marker';
        if (isSuspect) cls += ' suspect';
        else if (isApprox) cls += ' approx';

        const marker = L.marker([site.lat, site.lng], {
            icon: L.divIcon({ className: cls, iconSize: [14, 14], iconAnchor: [7, 7] })
        }).addTo(siteClusterGroup);

        let note = '';
        if (isSuspect) note = `<br><i style="color:#f87171">⚠️ shares coordinates with another site — check source data</i>`;
        else if (isApprox) note = `<br><i style="color:#ffb703">~town-level location</i>`;

        marker.bindPopup(`<b>🏗️ ${site.name}</b><br>${site.client || ''}${note}`);
        siteMarkers[site.id] = marker;
    });
}

// ---------------------------------------------------------------
// TAB NAVIGATION
// ---------------------------------------------------------------
function wireTopLevelControls() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => switchView(btn.dataset.view));
    });

    document.getElementById('start-btn').onclick = startTrackingMission;
    document.getElementById('fetch-verify-btn').onclick = fetchAndVerifyTruckPosition;
    document.getElementById('verify-btn').onclick = verifyTruckPositionManual;
    document.getElementById('fleet-refresh-btn').onclick = () => { renderFleetTable(); updateStatsDisplays(); };
    document.getElementById('wialon-test-btn').onclick = testWialonConnection;

    const sidebar = document.getElementById('sidebar');
    const floatBtn = document.getElementById('floating-menu-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');
    closeBtn.onclick = function () {
        sidebar.classList.add('collapsed');
        floatBtn.style.display = 'flex';
        setTimeout(() => { if (map) map.invalidateSize(); }, 400);
    };
    floatBtn.onclick = function () {
        sidebar.classList.remove('collapsed');
        floatBtn.style.display = 'none';
        setTimeout(() => { if (map) map.invalidateSize(); }, 400);
    };

    document.getElementById('truck-search').addEventListener('input', e => renderTruckList(e.target.value));
    document.getElementById('site-search').addEventListener('input', e => {
        filterSelect(masterSiteOptions, document.getElementById('site-select'), e.target.value);
    });
}

function switchView(viewName) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.view === viewName));

  const viewIds = ['dispatch', 'fleet', 'settings', 'queue', 'history', 'dashboard', 'notifications', 'monitoring'];
  viewIds.forEach(v => {
    const el = document.getElementById('view-' + v);
    if (el) el.classList.toggle('active', v === viewName);
  });

  if (viewName === 'dispatch') {
    setTimeout(() => { if (typeof map !== 'undefined' && map) map.invalidateSize(); }, 50);
  } else if (viewName === 'fleet') {
    if (typeof renderFleetTable === 'function') renderFleetTable();
  } else if (viewName === 'settings') {
    if (typeof renderGeofenceList === 'function') renderGeofenceList();
    if (typeof renderManualSiteList === 'function') renderManualSiteList();
  } else if (viewName === 'queue') {
    if (typeof renderDispatchQueue === 'function') renderDispatchQueue();
  } else if (viewName === 'history') {
    if (typeof renderHistoryTable === 'function') renderHistoryTable();
  } else if (viewName === 'dashboard') {
    if (typeof renderDashboard === 'function') renderDashboard();
  } else if (viewName === 'notifications') {
    if (typeof renderNotificationsLog === 'function') renderNotificationsLog();
  } else if (viewName === 'monitoring') {
    if (typeof renderMonitoringTable === 'function') renderMonitoringTable();
  }
}

// ---------------------------------------------------------------
// TRUCK MULTI-SELECT (convoy)
// ---------------------------------------------------------------
function renderTruckList(filterText) {
    const listEl = document.getElementById('truck-list');
    const ft = filterText.toLowerCase();
    listEl.innerHTML = '';
    fleetTrucks
        .filter(t => t.toLowerCase().includes(ft))
        .forEach(truck => {
            const row = document.createElement('div');
            row.className = 'truck-row' + (selectedTrucks.has(truck) ? ' checked' : '');
            row.innerHTML = `<input type="checkbox" ${selectedTrucks.has(truck) ? 'checked' : ''}> <span class="truck-id-label">${truck}</span>`;
            row.addEventListener('click', (e) => {
                e.preventDefault();
                toggleTruck(truck);
            });
            listEl.appendChild(row);
        });
}

function toggleTruck(truck) {
    if (selectedTrucks.has(truck)) {
        selectedTrucks.delete(truck);
    } else {
        selectedTrucks.add(truck);
    }
    renderTruckList(document.getElementById('truck-search').value);
    renderConvoyChips();
}

function renderConvoyChips() {
    const wrap = document.getElementById('convoy-chips');
    wrap.innerHTML = '';
    selectedTrucks.forEach(truck => {
        const chip = document.createElement('div');
        chip.className = 'chip';
        chip.innerHTML = `<span>${truck}</span>`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✕';
        removeBtn.onclick = () => toggleTruck(truck);
        chip.appendChild(removeBtn);
        wrap.appendChild(chip);
    });
}

// ---------------------------------------------------------------
// SITE DROPDOWN + SEARCH
// ---------------------------------------------------------------
function populateSiteDropdown() {
    const siteSelect = document.getElementById('site-select');
    constructionSites
        .filter(site => site.id !== 'site_0')
        .forEach(site => {
            let opt = document.createElement('option');
            opt.value = site.id;
            const label = site.client ? `${site.name} — ${site.client}` : site.name;
            if (site.lat == null) {
                opt.textContent = `${label} (⚠️ no coordinates)`;
            } else if (site.dupSuspect) {
                opt.textContent = `${label} (⚠️ suspect coords)`;
            } else if (site.accuracy === 'town') {
                opt.textContent = `${label} (~town-level)`;
            } else {
                opt.textContent = label;
            }
            siteSelect.appendChild(opt);
        });
    masterSiteOptions = Array.from(siteSelect.options);
}

function filterSelect(masterOptions, selectElement, rawFilterText) {
    const filterText = rawFilterText.toLowerCase();
    selectElement.innerHTML = '';
    masterOptions.forEach(opt => {
        if (opt.text.toLowerCase().includes(filterText)) {
            selectElement.appendChild(opt.cloneNode(true));
        }
    });
}

// ---------------------------------------------------------------
// DISPATCH (supports multiple trucks to one destination — a convoy)
// ---------------------------------------------------------------
function startTrackingMission() {
    if (!map) {
        alert("The map didn't load, so runs can't be routed right now. Refresh the page once you have a stable connection.");
        return;
    }

    const siteId = document.getElementById('site-select').value;

    if (selectedTrucks.size === 0 || !siteId) {
        alert("Select at least one truck and a destination site first!");
        return;
    }

    const targetSite = constructionSites.find(s => s.id === siteId);

    if (!targetSite || targetSite.lat == null || targetSite.lng == null) {
        alert(`No coordinates are available yet for "${targetSite ? targetSite.name : siteId}". Add its GPS location before it can be routed.`);
        return;
    }

    const destinationCoords = [targetSite.lat, targetSite.lng];

    if (routingControl) {
        map.removeControl(routingControl);
    }

    routingControl = L.Routing.control({
        waypoints: [
            L.latLng(AMOUDA_COORDS[0], AMOUDA_COORDS[1]),
            L.latLng(destinationCoords[0], destinationCoords[1])
        ],
        lineOptions: { styles: [{ color: '#6d5bff', weight: 5, opacity: 0.9 }] },
        createMarker: function () { return null; },
        addWaypoints: false,
        show: false
    }).addTo(map);

    // Capture the actual road geometry once OSRM returns it, so
    // verifyTruckPosition can measure real distance-to-road, not just
    // straight-line distance to the destination pin.
    const trucksInThisDispatch = Array.from(selectedTrucks);
    routingControl.on('routesfound', function (e) {
        const route = e.routes[0];
        const routeLine = route.coordinates.map(c => [c.lat, c.lng]);
        const totalDistance = route.summary.totalDistance; // meters
        const totalTime = route.summary.totalTime; // seconds
        trucksInThisDispatch.forEach(truckId => {
            if (activeRuns[truckId]) {
                activeRuns[truckId].routeLine = routeLine;
                activeRuns[truckId].routeTotalDistance = totalDistance;
                activeRuns[truckId].routeTotalTime = totalTime;
            }
        });
    });
    routingControl.on('routingerror', function () {
        console.warn('Route geometry could not be calculated — deviation check will fall back to straight-line distance.');
    });

    const now = new Date();
    const activeSelect = document.getElementById('active-trucks');

    selectedTrucks.forEach(truckId => {
        activeRuns[truckId] = {
            siteId: targetSite.id,
            siteName: targetSite.name,
            client: targetSite.client,
            routeCoords: destinationCoords,
            marker: null,
            dispatchedAt: now,
            lastVerifiedAt: null,
            lastCoords: null
        };

        const existingOpt = Array.from(activeSelect.options).find(o => o.value === truckId);
        if (existingOpt) existingOpt.remove();

        let opt = document.createElement('option');
        opt.value = truckId;
        opt.textContent = targetSite.client ? `${truckId} (➡️ ${targetSite.name} — ${targetSite.client})` : `${truckId} (➡️ ${targetSite.name})`;
        activeSelect.appendChild(opt);
    });

    // reset convoy selection after dispatch
    selectedTrucks.clear();
    renderTruckList(document.getElementById('truck-search').value);
    renderConvoyChips();

    updateStatsDisplays();
    renderFleetTable();
    map.fitBounds(L.latLngBounds([AMOUDA_COORDS, destinationCoords]), { padding: [60, 60] });

    renderDashboard();
    switchView('fleet'); // per feedback: dispatching should immediately show Active Fleet
}

// ---------------------------------------------------------------
// VERIFY POSITION
// ---------------------------------------------------------------
// Core deviation + ETA + marker logic, shared by both the manual-paste
// fallback and the live Wialon fetch path — so both produce identical,
// consistent results.
function applyPositionCheck(truckId, coordsArray, sourceLabel, options = {}) {
    const { openPopup = true, recenterMap = true } = options;
    if (!map) {
        alert("The map didn't load, so position can't be plotted right now. Refresh the page once you have a stable connection.");
        return;
    }
    if (!activeRuns[truckId]) {
        alert("That truck isn't currently an active run. Start a tracking run for it first.");
        return;
    }

    const run = activeRuns[truckId];
    if (run.marker) map.removeLayer(run.marker);

    let deviationMeters = null;
    let deviationBasis = 'route';
    let etaSeconds = null;
    let etaBasis = null;

    if (run.routeLine && run.routeLine.length >= 2) {
        const proj = projectPointOntoRoute(coordsArray, run.routeLine);
        deviationMeters = proj.distanceToRoute;

        if (run.routeTotalDistance && run.routeTotalTime) {
            const remainingDistance = Math.max(0, proj.totalRouteLength - proj.distanceCovered);
            const avgSpeedMps = run.routeTotalDistance / run.routeTotalTime;
            etaSeconds = remainingDistance / avgSpeedMps;
            etaBasis = 'osrm-speed';
        }
    } else {
        deviationBasis = 'straight';
        deviationMeters = haversineMeters(coordsArray[0], coordsArray[1], run.routeCoords[0], run.routeCoords[1]);
        etaSeconds = (deviationMeters / 1000) / FALLBACK_AVG_SPEED_KMH * 3600;
        etaBasis = 'fallback-speed';
    }

    const onRoute = deviationBasis === 'route' && deviationMeters <= ROUTE_BUFFER_METERS;
    const markerClass = deviationBasis === 'route'
        ? (onRoute ? 'truck-pos-marker' : 'truck-pos-marker off-route')
        : 'truck-pos-marker unknown-route';

    const truckMarker = L.marker(coordsArray, {
        icon: L.divIcon({ className: markerClass, iconSize: [16, 16], iconAnchor: [8, 8] })
    }).addTo(map);

    let popupText = `<b>🚚 Truck ${truckId}</b><br>${run.siteName}<br>`;
    if (sourceLabel) popupText += `<span style="color:#8f8fb0; font-size:.8em;">${sourceLabel}</span><br>`;
    if (deviationBasis === 'route') {
        popupText += onRoute
            ? `<span style="color:#4ade80">✅ On route</span> (${Math.round(deviationMeters)}m from road)`
            : `<span style="color:#f87171">⚠️ Off route by ${(deviationMeters / 1000).toFixed(1)}km</span>`;
    } else {
        popupText += `<span style="color:#ffb703">ℹ️ Route geometry unavailable — showing straight-line distance to destination: ${(deviationMeters / 1000).toFixed(1)}km</span>`;
    }
    if (etaSeconds != null) {
        const etaLabel = etaBasis === 'osrm-speed'
            ? `⏱️ ~${formatDuration(etaSeconds)} to destination`
            : `⏱️ ~${formatDuration(etaSeconds)} to destination <i>(rough estimate — no route data, assumes ${FALLBACK_AVG_SPEED_KMH}km/h)</i>`;
        popupText += `<br>${etaLabel}`;
    }
    truckMarker.bindPopup(popupText);
    if (openPopup) truckMarker.openPopup();

    run.marker = truckMarker;
    run.lastVerifiedAt = new Date();
    run.lastCoords = coordsArray;
    run.lastDeviationMeters = deviationMeters;
    run.lastDeviationBasis = deviationBasis;
    run.lastOnRoute = deviationBasis === 'route' ? onRoute : null;
    run.lastEtaSeconds = etaSeconds;
    run.lastEtaBasis = etaBasis;

    if (recenterMap) map.setView(coordsArray, 10);
    updateStatsDisplays();
    renderFleetTable();
}

// Fallback path — manual paste, kept as a safety net if live fetch fails.
function verifyTruckPositionManual() {
    const truckId = document.getElementById('active-trucks').value;
    const rawCoords = document.getElementById('wialon-coords').value;

    if (!truckId || !rawCoords) {
        alert("Please select an Active Monitored Truck and paste coordinates from Wialon!");
        return;
    }
    const coordsArray = rawCoords.split(',').map(num => parseFloat(num.trim()));
    if (coordsArray.length !== 2 || isNaN(coordsArray[0]) || isNaN(coordsArray[1])) {
        alert("Invalid format! Please paste normal coordinates like: 36.2341, 2.9845");
        return;
    }
    applyPositionCheck(truckId, coordsArray, 'Pasted manually');
}

// ---------------------------------------------------------------
// LIVE WIALON POSITION FETCH — primary path
// ---------------------------------------------------------------
let wialonSession = null; // { sid, token, relay, timestamp }

function getWialonConfig() {
    return {
        relay: document.getElementById('wialon-relay').value.trim().replace(/\/$/, ''),
        server: document.getElementById('wialon-server').value.trim(),
        token: document.getElementById('wialon-token').value.trim()
    };
}

async function wialonCall(config, svc, params, sid) {
    let url = `${config.relay}/?server=${encodeURIComponent(config.server)}&svc=${encodeURIComponent(svc)}&params=${encodeURIComponent(JSON.stringify(params))}`;
    if (sid) url += `&sid=${encodeURIComponent(sid)}`;
    const resp = await fetch(url);
    return resp.json();
}

async function ensureWialonSession(config) {
    const now = Date.now();
    // Reuse an existing session for 8 minutes to avoid re-logging in on every check
    if (wialonSession && wialonSession.token === config.token && wialonSession.relay === config.relay &&
        (now - wialonSession.timestamp) < 8 * 60 * 1000) {
        return wialonSession.sid;
    }
    const loginData = await wialonCall(config, 'token/login', { token: config.token });
    if (loginData.error) {
        throw new Error(`Wialon login failed (code ${loginData.error}${loginData.reason ? ': ' + loginData.reason : ''})`);
    }
    wialonSession = { sid: loginData.eid, token: config.token, relay: config.relay, timestamp: now };
    return loginData.eid;
}

async function findWialonUnitPosition(config, truckId) {
    const sid = await ensureWialonSession(config);

    // We don't know for certain how unit names in Wialon map to our internal
    // truck IDs, so try a few reasonable patterns rather than assuming an
    // exact match — widest (full ID) first, then looser fallbacks.
    const candidates = [truckId, truckId.replace(/^0+/, ''), truckId.split('-')[0]];
    let items = [];
    for (const candidate of candidates) {
        const data = await wialonCall(config, 'core/search_items', {
            spec: { itemsType: 'avl_unit', propName: 'sys_name', propValueMask: `*${candidate}*`, sortType: 'sys_name' },
            force: 1, flags: 1025, from: 0, to: 0
        }, sid);
        if (data.error) throw new Error(`Wialon search failed (code ${data.error})`);
        if (data.items && data.items.length > 0) {
            items = data.items;
            break;
        }
    }

    if (items.length === 0) {
        throw new Error(`No Wialon unit found matching "${truckId}". Unit names in Wialon may not match your truck ID format.`);
    }
    if (items.length > 1) {
        throw new Error(`Multiple Wialon units matched "${truckId}": ${items.map(i => i.nm).join(', ')}. Can't tell which one you mean.`);
    }

    const unit = items[0];
    if (!unit.pos) {
        throw new Error(`Found "${unit.nm}" in Wialon, but it has no recent position data.`);
    }

    return { lat: unit.pos.y, lng: unit.pos.x, timestamp: unit.pos.t, unitName: unit.nm };
}

async function fetchAndVerifyTruckPosition() {
    const truckId = document.getElementById('active-trucks').value;
    const statusEl = document.getElementById('wialon-fetch-status');

    if (!truckId) {
        alert("Select an Active Monitored Truck first.");
        return;
    }
    if (!activeRuns[truckId]) {
        alert("That truck isn't currently an active run. Start a tracking run for it first.");
        return;
    }

    const config = getWialonConfig();
    if (!config.relay || !config.server || !config.token) {
        statusEl.innerHTML = `<span style="color:#ffb703">⚠️ Fill in the relay URL, server, and token on the Wialon Test tab first.</span>`;
        return;
    }

    statusEl.innerHTML = `<span style="color:#8f8fb0">Fetching live position for ${truckId}...</span>`;

    try {
        const pos = await findWialonUnitPosition(config, truckId);
        const ageMinutes = pos.timestamp ? Math.round((Date.now() / 1000 - pos.timestamp) / 60) : null;
        const ageLabel = ageMinutes != null ? ` (${ageMinutes < 1 ? 'just now' : ageMinutes + 'min old'})` : '';
        statusEl.innerHTML = `<span style="color:#4ade80">✅ Got position from "${pos.unitName}"${ageLabel}</span>`;
        applyPositionCheck(truckId, [pos.lat, pos.lng], `Live from Wialon${ageLabel}`);
    } catch (err) {
        statusEl.innerHTML = `<span style="color:#f87171">⚠️ ${err.message}</span>`;
        console.error('Wialon fetch error:', err);
    }
}

// ---------------------------------------------------------------
// STATS + FLEET TABLE
// ---------------------------------------------------------------
function updateStatsDisplays() {
    const activeCount = Object.keys(activeRuns).length;
    document.getElementById('active-count').textContent = activeCount;
    document.getElementById('fleet-total').textContent = fleetTrucks.length;
    document.getElementById('topbar-active-count').textContent = activeCount;
    document.getElementById('topbar-fleet-total').textContent = fleetTrucks.length;
}

function timeAgo(date) {
    if (!date) return '—';
    const s = Math.floor((new Date() - date) / 1000);
    if (s < 60) return 'just now';
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    return `${h}h ${m % 60}m ago`;
}

let runHistory = [];

function recordRunToHistory(truckId, run) {
    runHistory.push({
        truckId,
        client: run.client || null,
        siteName: run.siteName,
        driverName: (fleetLiveData[truckId] && fleetLiveData[truckId].driverName) || null,
        dispatchedAt: run.dispatchedAt,
        stoppedAt: new Date(),
        reachedFactory: !!run.arrivedNotified,
        reachedSite: !!run.siteArrivedNotified,
        hadDeviation: !!run.everOffRoute,
        hadSpeeding: !!run.everSpeeding
    });
}

function isSameCalendarDay(d1, d2) {
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function stopTracking(truckId) {
    if (!activeRuns[truckId]) return;
    recordRunToHistory(truckId, activeRuns[truckId]);
    if (activeRuns[truckId].marker) map.removeLayer(activeRuns[truckId].marker);
    delete activeRuns[truckId];

    const activeSelect = document.getElementById('active-trucks');
    const opt = Array.from(activeSelect.options).find(o => o.value === truckId);
    if (opt) opt.remove();

    updateStatsDisplays();
    renderFleetTable();
    renderHistoryTable();
    renderDashboard();
}

let previewRouteLine = null;

// Draws a specific dispatched run's route on the map — uses the road
// geometry already cached from dispatch time (no extra OSRM call needed).
// Falls back to a dashed straight line if that geometry hasn't arrived yet.
function displayRunRoute(truckId, run) {
    switchView('dispatch');
    if (!map) return;
    setTimeout(() => {
        map.invalidateSize();
        if (previewRouteLine) map.removeLayer(previewRouteLine);

        if (run.routeLine && run.routeLine.length > 1) {
            previewRouteLine = L.polyline(run.routeLine, { color: '#6d5bff', weight: 5, opacity: 0.9 }).addTo(map);
            previewRouteLine.bindPopup(`<b>🚚 ${truckId}</b><br>Route to ${run.siteName}`).openPopup();
            map.fitBounds(L.latLngBounds(run.routeLine), { padding: [60, 60] });
        } else {
            previewRouteLine = L.polyline([AMOUDA_COORDS, run.routeCoords], {
                color: '#6d5bff', weight: 4, opacity: 0.6, dashArray: '8,8'
            }).addTo(map);
            previewRouteLine.bindPopup(`<b>🚚 ${truckId}</b><br>Route to ${run.siteName}<br><i style="color:#ffb703">Road geometry not cached yet — showing straight line</i>`).openPopup();
            map.fitBounds(L.latLngBounds([AMOUDA_COORDS, run.routeCoords]), { padding: [60, 60] });
        }
    }, 60);
}

function renderFleetTable() {
    const tbody = document.getElementById('fleet-tbody');
    const wrap = document.getElementById('fleet-table-wrap');
    const emptyEl = document.getElementById('fleet-empty');
    const entries = Object.entries(activeRuns);

    document.getElementById('kpi-active').textContent = entries.length;
    document.getElementById('kpi-verified').textContent = entries.filter(([, r]) => r.lastVerifiedAt).length;
    document.getElementById('kpi-unverified').textContent = entries.filter(([, r]) => !r.lastVerifiedAt).length;
    document.getElementById('kpi-fleet').textContent = fleetTrucks.length;
    const offRouteEl = document.getElementById('kpi-offroute');
    if (offRouteEl) {
        offRouteEl.textContent = entries.filter(([, r]) => r.lastDeviationBasis === 'route' && r.lastOnRoute === false).length;
    }

    if (entries.length === 0) {
        document.getElementById('fleet-table').style.display = 'none';
        emptyEl.style.display = 'block';
        return;
    }
    document.getElementById('fleet-table').style.display = 'table';
    emptyEl.style.display = 'none';

    tbody.innerHTML = '';
    entries
        .sort((a, b) => b[1].dispatchedAt - a[1].dispatchedAt)
        .forEach(([truckId, run]) => {
            const tr = document.createElement('tr');
            const verified = !!run.lastVerifiedAt;

            let statusClass = 'dispatched';
            let statusText = 'Awaiting check';
            if (run.arrivedNotified) {
                statusClass = 'arrived';
                statusText = '🏭 Arrived at factory';
            } else if (verified) {
                if (run.lastDeviationBasis === 'route') {
                    statusClass = run.lastOnRoute ? 'verified' : 'off-route';
                    statusText = run.lastOnRoute
                        ? 'On route'
                        : `Off route (${(run.lastDeviationMeters / 1000).toFixed(1)}km)`;
                } else {
                    statusClass = 'unknown-route';
                    statusText = 'Checked — no route data';
                }
            }

            const etaText = run.lastEtaSeconds != null
                ? formatDuration(run.lastEtaSeconds) + (run.lastEtaBasis === 'fallback-speed' ? ' (est.)' : '')
                : '—';

            tr.innerHTML = `
                <td class="truck-cell">${truckId}</td>
                <td>${run.client || '—'}</td>
                <td>${run.siteName}</td>
                <td><span class="status-pill ${statusClass}"><span class="status-dot"></span>${statusText}</span></td>
                <td>${etaText}</td>
                <td>${verified ? timeAgo(run.lastVerifiedAt) : 'Dispatched ' + timeAgo(run.dispatchedAt)}</td>
                <td class="row-actions">
                    <button class="jump-btn">Locate</button>
                    <button class="route-btn">Route</button>
                    <button class="stop stop-btn">Stop</button>
                </td>
            `;
            tr.querySelector('.jump-btn').onclick = () => {
                switchView('dispatch');
                if (!map) return;
                setTimeout(() => {
                    map.invalidateSize();
                    if (run.lastCoords) map.setView(run.lastCoords, 10);
                    else map.fitBounds(L.latLngBounds([AMOUDA_COORDS, run.routeCoords]), { padding: [60, 60] });
                }, 60);
            };
            tr.querySelector('.route-btn').onclick = () => displayRunRoute(truckId, run);
            tr.querySelector('.stop-btn').onclick = () => stopTracking(truckId);
            tbody.appendChild(tr);
        });
}

// ---------------------------------------------------------------
// WIALON CONNECTION TEST
// This is a standalone diagnostic — it does NOT wire into the dispatch
// flow. Token is read from the input field at click time only; it is
// never written into this file, localStorage, or anywhere persistent.
// ---------------------------------------------------------------
async function testWialonConnection() {
    const relay = document.getElementById('wialon-relay').value.trim().replace(/\/$/, '');
    const server = document.getElementById('wialon-server').value.trim();
    const token = document.getElementById('wialon-token').value.trim();
    const resultEl = document.getElementById('wialon-test-result');

    if (!relay || !server || !token) {
        resultEl.innerHTML = `<div class="wialon-result error">Enter the relay URL, server address, and your token.</div>`;
        return;
    }

    resultEl.innerHTML = `<div class="wialon-result loading">Connecting via relay to ${server}...</div>`;

    try {
        // Step 1: token/login via the relay — the relay calls Wialon server-side,
        // so the browser never talks to Wialon directly (avoids the CORS block).
        const loginParams = JSON.stringify({ token });
        const loginUrl = `${relay}/?server=${encodeURIComponent(server)}&svc=${encodeURIComponent('token/login')}&params=${encodeURIComponent(loginParams)}`;
        const loginResp = await fetch(loginUrl);
        const loginData = await loginResp.json();

        if (loginData.error) {
            resultEl.innerHTML = `<div class="wialon-result error">
                Login failed (error code ${loginData.error}${loginData.reason ? ': ' + loginData.reason : ''}).
                <div class="detail">Common causes: wrong/expired token, or wrong server (EU vs standard hosting).</div>
            </div>`;
            return;
        }

        const sid = loginData.eid;
        const userName = loginData.au || 'unknown';

        // Step 2: core/search_items via the relay — confirm it can see fleet data.
        const searchParams = JSON.stringify({
            spec: { itemsType: 'avl_unit', propName: 'sys_name', propValueMask: '*', sortType: 'sys_name' },
            force: 1, flags: 1, from: 0, to: 0
        });
        const searchUrl = `${relay}/?server=${encodeURIComponent(server)}&svc=${encodeURIComponent('core/search_items')}&params=${encodeURIComponent(searchParams)}&sid=${encodeURIComponent(sid)}`;
        const searchResp = await fetch(searchUrl);
        const searchData = await searchResp.json();

        if (searchData.error) {
            resultEl.innerHTML = `<div class="wialon-result error">
                Logged in as <b>${userName}</b>, but couldn't list units (error code ${searchData.error}).
                <div class="detail">The token may be scoped without unit/read access.</div>
            </div>`;
            return;
        }

        const units = searchData.items || [];
        const unitListHtml = units.slice(0, 15).map(u => `<div>🚚 ${u.nm}</div>`).join('');
        const moreText = units.length > 15 ? `<div style="color:var(--text-dim)">...and ${units.length - 15} more</div>` : '';

        resultEl.innerHTML = `<div class="wialon-result success">
            ✅ Connected successfully as <b>${userName}</b> (via relay).
            <div class="detail">Session established &middot; ${units.length} unit(s) visible to this token</div>
            ${units.length > 0 ? `<div class="wialon-unit-list">${unitListHtml}${moreText}</div>` : ''}
        </div>`;

    } catch (err) {
        resultEl.innerHTML = `<div class="wialon-result error">
            Request failed: ${err.message}
            <div class="detail">This time the browser is only talking to your relay URL, not Wialon directly — if this still fails, check that the relay URL is correct and the Worker is deployed (not just saved).</div>
        </div>`;
        console.error('Wialon test error:', err);
    }
}

// ---------------------------------------------------------------
// ARRIVAL NOTIFICATIONS — background polling while the app is open
// Note: this only works while this browser tab is open. It is NOT a
// push notification system that works with the app closed — that
// would need a real backend running independently of the browser.
// ---------------------------------------------------------------
let notificationsEnabled = false;
let pollIntervalId = null;

function setupNotificationToggle() {
    const btn = document.getElementById('notify-toggle-btn');
    if (!btn) return;
    btn.addEventListener('click', toggleNotifications);
    updateNotificationToggleUI();
}

function updateNotificationToggleUI() {
    const btn = document.getElementById('notify-toggle-btn');
    const statusEl = document.getElementById('notify-status');
    if (!btn) return;
    btn.classList.toggle('active', notificationsEnabled);
    btn.textContent = notificationsEnabled ? '🔔 Arrival alerts ON' : '🔕 Arrival alerts OFF';
    if (statusEl) {
        statusEl.textContent = notificationsEnabled
            ? `Checking active trucks every ${POLL_INTERVAL_MS / 60000} min while this tab stays open`
            : '';
    }
}

async function toggleNotifications() {
    if (notificationsEnabled) {
        notificationsEnabled = false;
        updateNotificationToggleUI();
        updatePollingState();
        return;
    }

    if (typeof Notification === 'undefined') {
        alert("This browser doesn't support desktop notifications.");
        return;
    }

    // Always call requestPermission() directly rather than gatekeeping on
    // Notification.permission first — it's safe to call even if a decision
    // was already made (it just resolves immediately without re-prompting),
    // and checking the property first can produce a false "blocked" reading
    // in some environments before any request has actually been made.
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
        alert("Notifications weren't enabled. If you didn't see a permission prompt, they may be blocked for this page in your browser's site settings.");
        return;
    }

    notificationsEnabled = true;
    updateNotificationToggleUI();
    updatePollingState();
}

function toggleLiveTracking() {
    liveTrackingEnabled = !liveTrackingEnabled;
    updateLiveTrackingToggleUI();
    if (!liveTrackingEnabled) {
        // Clear markers immediately rather than waiting for the next poll
        Object.values(liveTruckMarkers).forEach(m => truckClusterGroup && truckClusterGroup.removeLayer(m));
        liveTruckMarkers = {};
    }
    updatePollingState();
}

function updateLiveTrackingToggleUI() {
    const btn = document.getElementById('live-tracking-toggle-btn');
    if (!btn) return;
    btn.classList.toggle('active', liveTrackingEnabled);
    btn.textContent = liveTrackingEnabled ? '📡 Live Fleet ON' : '📡 Live Fleet OFF';
}

// Single shared polling loop — runs if EITHER live tracking or notifications
// are enabled, so we're never running two overlapping refresh cycles.
function updatePollingState() {
    if (liveTrackingEnabled || notificationsEnabled) {
        startPolling();
    } else {
        stopPolling();
    }
}

function startPolling() {
    if (pollIntervalId) return;
    refreshFullFleetLive(); // run once immediately, then on the interval
    pollIntervalId = setInterval(refreshFullFleetLive, POLL_INTERVAL_MS);
}

function stopPolling() {
    if (pollIntervalId) clearInterval(pollIntervalId);
    pollIntervalId = null;
}

// ---------------------------------------------------------------
// FULL-FLEET LIVE TRACKING
// ---------------------------------------------------------------
const MOVING_SPEED_THRESHOLD_KMH = 5;
const OFFLINE_AFTER_MINUTES = 30;

// truckId -> { lat, lng, speed, driverName, ageMinutes, status, unitName, matched }
let fleetLiveData = {};
let liveFleetFilters = { dispatched: true, idle: false, offline: false, all: false };
let liveTruckMarkers = {}; // truckId -> L.marker
let liveTrackingEnabled = false;

// Broad-but-JS-safe flags value: empirically confirmed to include pos+lmsg
// for units (documented Wialon example). For resources we cast a wider net
// since the exact drivers-library bit isn't nailed down from public docs —
// see resolveDriverName() for the graceful fallback if this doesn't land.
const WIALON_UNIT_FLAGS = 1439;
const WIALON_RESOURCE_FLAGS = 0x0001FFFF;

async function fetchAllWialonUnitsRaw(config) {
    const sid = await ensureWialonSession(config);
    const data = await wialonCall(config, 'core/search_items', {
        spec: { itemsType: 'avl_unit', propName: 'sys_name', propValueMask: '*', sortType: 'sys_name' },
        force: 1, flags: WIALON_UNIT_FLAGS, from: 0, to: 0
    }, sid);
    if (data.error) throw new Error(`Wialon unit search failed (code ${data.error})`);
    return data.items || [];
}

async function fetchWialonDriverMaps(config) {
    const sid = await ensureWialonSession(config);
    const data = await wialonCall(config, 'core/search_items', {
        spec: { itemsType: 'avl_resource', propName: 'sys_name', propValueMask: '*', sortType: 'sys_name' },
        force: 1, flags: WIALON_RESOURCE_FLAGS, from: 0, to: 0
    }, sid);
    if (data.error) throw new Error(`Wialon resource search failed (code ${data.error})`);

    const driverByUnitId = {};
    const driverByCode = {};
    (data.items || []).forEach(resource => {
        const drvrs = resource.drvrs || {};
        Object.values(drvrs).forEach(drv => {
            if (drv.bu) driverByUnitId[drv.bu] = drv.n;
            if (drv.c) driverByCode[drv.c] = drv.n;
        });
    });
    return { driverByUnitId, driverByCode };
}

function resolveDriverName(unit, driverMaps) {
    if (driverMaps.driverByUnitId[unit.id]) return driverMaps.driverByUnitId[unit.id];
    const code = (unit.lmsg && unit.lmsg.p && unit.lmsg.p.drv) || (unit.pos && unit.pos.p && unit.pos.p.drv) || unit.drv;
    if (code && driverMaps.driverByCode[code]) return driverMaps.driverByCode[code];
    return null; // graceful — caller falls back to showing just the truck ID
}

// Matches our internal fleetTrucks IDs against Wialon's unit names in bulk
// (one pass over an already-fetched list, not a search per truck).
function matchFleetToUnits(rawUnits) {
    const matched = {};
    const usedUnitIds = new Set();
    fleetTrucks.forEach(truckId => {
        const candidates = [truckId, truckId.replace(/^0+/, ''), truckId.split('-')[0]];
        let foundUnit = null;
        for (const candidate of candidates) {
            const hit = rawUnits.find(u => !usedUnitIds.has(u.id) && u.nm && u.nm.includes(candidate));
            if (hit) { foundUnit = hit; break; }
        }
        if (foundUnit) {
            matched[truckId] = foundUnit;
            usedUnitIds.add(foundUnit.id);
        }
    });
    return matched;
}

function classifyTruckStatus(unit) {
    if (!unit || !unit.pos) return 'offline';
    const speed = unit.pos.s || 0;
    const ageMinutes = (Date.now() / 1000 - unit.pos.t) / 60;
    if (ageMinutes >= OFFLINE_AFTER_MINUTES) return 'offline';
    if (speed > MOVING_SPEED_THRESHOLD_KMH) return 'moving';
    return 'idle';
}

async function refreshFullFleetLive() {
    const config = getWialonConfig();
    if (!config.relay || !config.server || !config.token) return;

    let rawUnits, driverMaps;
    try {
        [rawUnits, driverMaps] = await Promise.all([
            fetchAllWialonUnitsRaw(config),
            fetchWialonDriverMaps(config).catch(err => {
                console.warn('Driver library fetch failed — falling back to truck IDs only:', err.message);
                return { driverByUnitId: {}, driverByCode: {} };
            })
        ]);
    } catch (err) {
        console.warn('Full fleet refresh failed:', err.message);
        return;
    }

    const matched = matchFleetToUnits(rawUnits);

    fleetTrucks.forEach(truckId => {
        const unit = matched[truckId];
        if (!unit) {
            fleetLiveData[truckId] = { matched: false, status: 'offline' };
            return;
        }
        const status = classifyTruckStatus(unit);
        fleetLiveData[truckId] = {
            matched: true,
            lat: unit.pos ? unit.pos.y : null,
            lng: unit.pos ? unit.pos.x : null,
            speed: unit.pos ? unit.pos.s : null,
            course: unit.pos && unit.pos.c != null ? unit.pos.c : null, // compass heading, 0-360°, 0=North
            ageMinutes: unit.pos ? Math.round((Date.now() / 1000 - unit.pos.t) / 60) : null,
            status,
            unitName: unit.nm,
            driverName: resolveDriverName(unit, driverMaps)
        };
    });

    renderLiveFleetMarkers();
    renderLiveFleetList();
    updateFleetHeaderStats();
    renderDashboard();
    renderMonitoringTable();

    // Feed active-run trucks through the same off-route/arrival checks used
    // by the notification system, using data we already fetched (no extra calls).
    if (notificationsEnabled) checkActiveRunsForAlerts();
}

// Smoothly glides a marker from its current position to a new one instead
// of jumping instantly — matters here because polls only happen every 60s,
// so an instant jump reads as a teleport rather than movement.
function animateMarkerTo(marker, toLatLng, duration = 1200) {
    const from = marker.getLatLng();
    const start = performance.now();

    if (marker._animFrame) cancelAnimationFrame(marker._animFrame);

    function step(now) {
        const t = Math.min((now - start) / duration, 1);
        const lat = from.lat + (toLatLng[0] - from.lat) * t;
        const lng = from.lng + (toLatLng[1] - from.lng) * t;
        marker.setLatLng([lat, lng]);
        if (t < 1) marker._animFrame = requestAnimationFrame(step);
    }
    marker._animFrame = requestAnimationFrame(step);
}

function renderLiveFleetMarkers() {
    if (!map) return;
    Object.entries(fleetLiveData).forEach(([truckId, data]) => {
        const shouldShow = liveTrackingEnabled && data.matched && data.lat != null && passesLiveFilter(data, truckId);

        if (!shouldShow) {
            if (liveTruckMarkers[truckId]) {
                truckClusterGroup.removeLayer(liveTruckMarkers[truckId]);
                delete liveTruckMarkers[truckId];
            }
            return;
        }

        const label = data.driverName ? `${data.driverName} · ${truckId}` : truckId;

        // Off-route overrides the normal motion-state color — a truck that's
        // deviated matters more than whether it's currently moving or idle.
        const run = activeRuns[truckId];
        const isOffRoute = run && run.lastDeviationBasis === 'route' && run.lastOnRoute === false;

        let statusColor;
        if (isOffRoute) statusColor = '#f87171';       // red
        else if (data.status === 'moving') statusColor = '#4ade80'; // green
        else if (data.status === 'idle') statusColor = '#22d3ee';   // cyan
        else statusColor = '#6b7280';                    // gray (offline)

        // Directional arrow rotated to the truck's actual compass heading.
        // Wialon reports course as 0-360° with 0=North, which lines up
        // directly with a CSS rotation on an arrow that points up by default.
        // Falls back to a plain dot when no heading data is available.
        const markerShapeHtml = data.course != null
            ? `<svg class="live-truck-arrow" width="22" height="22" viewBox="0 0 24 24" style="transform:rotate(${data.course}deg); filter:drop-shadow(0 1px 2px rgba(0,0,0,.6));"><path d="M12 1.5 L20 21 L12 16 L4 21 Z" fill="${statusColor}" stroke="#0a0a14" stroke-width="1.75" stroke-linejoin="round"/></svg>`
            : `<div class="live-truck-dot" style="background:${statusColor}; box-shadow:0 0 8px ${statusColor}"></div>`;

        const icon = L.divIcon({
            className: 'live-truck-marker',
            html: `<div class="live-truck-label">${label}</div>${markerShapeHtml}`,
            iconSize: [140, 34],
            iconAnchor: [70, 30]
        });

        if (liveTruckMarkers[truckId]) {
            animateMarkerTo(liveTruckMarkers[truckId], [data.lat, data.lng]);
            liveTruckMarkers[truckId].setIcon(icon);
        } else {
            liveTruckMarkers[truckId] = L.marker([data.lat, data.lng], { icon }).addTo(truckClusterGroup);
        }
        liveTruckMarkers[truckId].bindPopup(
            `<b>🚚 ${truckId}</b>${data.driverName ? `<br>Driver: ${data.driverName}` : ''}<br>${data.status} &middot; ${data.speed || 0} km/h${data.course != null ? ` &middot; heading ${Math.round(data.course)}°` : ''}<br><span style="color:#8f8fb0; font-size:.8em;">Updated ${data.ageMinutes}min ago</span>`
        );
    });
    // Re-evaluate cluster groupings now that positions may have changed —
    // done once per full update rather than per marker for efficiency.
    if (truckClusterGroup.refreshClusters) truckClusterGroup.refreshClusters();
}

function passesLiveFilter(data, truckId) {
    if (liveFleetFilters.all) return true;
    if (liveFleetFilters.dispatched && activeRuns[truckId]) return true;
    if (liveFleetFilters.idle && data.status === 'idle') return true;
    if (liveFleetFilters.offline && data.status === 'offline') return true;
    return false;
}

function updateFleetHeaderStats() {
    const values = Object.values(fleetLiveData);
    const moving = values.filter(d => d.status === 'moving').length;
    const idle = values.filter(d => d.status === 'idle').length;
    const offline = values.filter(d => d.status === 'offline').length;
    const el = document.getElementById('topbar-live-stats');
    if (el) {
        el.textContent = `${moving} Moving · ${idle} Idle · ${offline} Offline`;
    }
}

// ---------------------------------------------------------------
// ACTIVE-RUN ALERTS: off-route, site arrival, factory arrival
// Uses data already fetched by refreshFullFleetLive — no extra API calls.
// ---------------------------------------------------------------
function checkActiveRunsForAlerts() {
    Object.entries(activeRuns).forEach(([truckId, run]) => {
        const data = fleetLiveData[truckId];
        if (!data || !data.matched || data.lat == null) return;

        const point = [data.lat, data.lng];

        applyPositionCheck(truckId, point, `Auto-checked ${new Date().toLocaleTimeString()}`, {
            openPopup: false, recenterMap: false
        });

        // Off-route: notify once on the on->off transition, not every poll
        if (run.lastDeviationBasis === 'route') {
            if (!run.lastOnRoute && !run.offRouteNotified) {
                run.offRouteNotified = true;
                run.everOffRoute = true; // never reset — used for history/reporting, unlike offRouteNotified
                fireOffRouteNotification(truckId, run);
            } else if (run.lastOnRoute) {
                run.offRouteNotified = false; // back on route — allow future re-alerts
            }
        }

        // Speeding: same on/off transition pattern as off-route, so a driver
        // sitting above the limit doesn't get re-notified every single poll.
        if (data.speed != null) {
            if (data.speed > SPEED_LIMIT_KMH && !run.speedingNotified) {
                run.speedingNotified = true;
                run.everSpeeding = true; // never reset — used for history/ratings
                fireSpeedingNotification(truckId, run, data.speed);
            } else if (data.speed <= SPEED_LIMIT_KMH) {
                run.speedingNotified = false; // back under the limit — allow future re-alerts
            }
        }

        // Factory arrival (return trip)
        const factoryGeofence = geofences.find(g => g.kind === 'factory');
        if (factoryGeofence && !run.arrivedNotified && isNearGeofence(point, factoryGeofence)) {
            run.arrivedNotified = true;
            run.arrivedAt = new Date();
            fireArrivalNotification(truckId, run, 'factory');
        }

        // Site arrival — uses the real geofence polygon when one has been
        // matched from an uploaded KML; otherwise falls back to a distance
        // buffer around the site's known point coordinate, so arrival
        // detection works for every site, not just the ones with KML data.
        if (!run.siteArrivedNotified) {
            const siteGeofence = geofences.find(g => g.kind === 'site' && g.siteId === run.siteId);
            let arrived = false;
            if (siteGeofence) {
                arrived = isNearGeofence(point, siteGeofence);
            } else if (run.routeCoords) {
                arrived = haversineMeters(point[0], point[1], run.routeCoords[0], run.routeCoords[1]) <= SITE_ARRIVAL_BUFFER_METERS;
            }
            if (arrived) {
                run.siteArrivedNotified = true;
                fireArrivalNotification(truckId, run, 'site');
            }
        }
    });
    renderFleetTable();
}

let soundAlertsEnabled = false;

function toggleSoundAlerts() {
    soundAlertsEnabled = !soundAlertsEnabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
        btn.classList.toggle('active', soundAlertsEnabled);
        btn.textContent = soundAlertsEnabled ? '🔊 Sound ON' : '🔇 Sound OFF';
    }
    if (soundAlertsEnabled) playAlertSound('arrival'); // quick confirmation beep so you know it's working
}

// Generates a short tone with the Web Audio API — no external audio file
// needed, so this stays a genuinely single-file app.
function playAlertSound(kind) {
    if (!soundAlertsEnabled) return;
    try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        if (kind === 'offroute') {
            // Sharper, more urgent — two-tone falling alert
            osc.type = 'square';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.setValueAtTime(330, ctx.currentTime + 0.15);
        } else {
            // Gentler rising chime for arrivals — good news
            osc.type = 'sine';
            osc.frequency.setValueAtTime(660, ctx.currentTime);
            osc.frequency.setValueAtTime(880, ctx.currentTime + 0.12);
        }
        gain.gain.setValueAtTime(0.22, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
    } catch (err) {
        console.warn('Could not play alert sound:', err.message);
    }
}

let notificationLog = [];

function logNotification(kind, truckId, message) {
    notificationLog.push({ time: new Date(), kind, truckId, message });
    renderNotificationsLog();
}

function fireArrivalNotification(truckId, run, kind) {
    playAlertSound('arrival');
    const isFactory = kind === 'factory';
    const message = isFactory
        ? `${truckId} is back at Usine Amouda Ciment (was on a run to ${run.siteName}).`
        : `${truckId} has arrived at ${run.siteName}.`;
    logNotification(isFactory ? 'factory' : 'site', truckId, message);

    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const n = new Notification(isFactory ? '🟣 Truck entered factory' : '🟢 Truck arrived at customer', {
        body: message,
        tag: `arrival-${kind}-${truckId}`
    });
    n.onclick = () => window.focus();
}

function fireOffRouteNotification(truckId, run) {
    playAlertSound('offroute');
    const message = `${truckId} has deviated from its route to ${run.siteName} (${(run.lastDeviationMeters / 1000).toFixed(1)}km off).`;
    logNotification('offroute', truckId, message);

    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const n = new Notification('🔴 Truck left assigned route', {
        body: message,
        tag: `offroute-${truckId}`
    });
    n.onclick = () => window.focus();
}

function fireSpeedingNotification(truckId, run, speed) {
    playAlertSound('offroute'); // reuse the urgent tone — this is also a safety alert
    const message = `${truckId} is going ${Math.round(speed)}km/h on the run to ${run.siteName} (limit ${SPEED_LIMIT_KMH}km/h).`;
    logNotification('speeding', truckId, message);

    if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const n = new Notification('🟠 Speed limit exceeded', {
        body: message,
        tag: `speeding-${truckId}`
    });
    n.onclick = () => window.focus();
}

// ---------------------------------------------------------------
// LIVE FLEET SIDEBAR LIST + FILTERS + SEARCH
// ---------------------------------------------------------------
function renderLiveFleetList() {
    const listEl = document.getElementById('live-fleet-list');
    if (!listEl) return;

    const searchText = (document.getElementById('live-fleet-search')?.value || '').toLowerCase();

    const rows = fleetTrucks
        .filter(truckId => passesLiveFilter(fleetLiveData[truckId] || { status: 'offline' }, truckId))
        .filter(truckId => {
            if (!searchText) return true;
            const data = fleetLiveData[truckId] || {};
            return truckId.toLowerCase().includes(searchText) ||
                (data.driverName && data.driverName.toLowerCase().includes(searchText));
        });

    if (rows.length === 0) {
        listEl.innerHTML = `<div style="padding:14px; color:var(--text-dim); font-size:.8rem; text-align:center;">No trucks match the current filters.</div>`;
        return;
    }

    listEl.innerHTML = rows.map(truckId => {
        const data = fleetLiveData[truckId] || { status: 'offline', matched: false };
        const run = activeRuns[truckId];
        const isOffRoute = run && run.lastDeviationBasis === 'route' && run.lastOnRoute === false;
        let statusColor, statusLabel;
        if (isOffRoute) { statusColor = '#f87171'; statusLabel = 'off-route'; }
        else if (data.status === 'moving') { statusColor = 'var(--green)'; statusLabel = 'moving'; }
        else if (data.status === 'idle') { statusColor = '#22d3ee'; statusLabel = 'idle'; }
        else { statusColor = 'var(--text-dim)'; statusLabel = 'offline'; }
        return `
            <div class="live-fleet-row" data-truck="${truckId}">
                <div class="live-fleet-row-main">
                    <span class="live-fleet-driver">${data.driverName || '—'}</span>
                    <span class="live-fleet-truckid">${truckId}</span>
                </div>
                <div class="live-fleet-row-meta">
                    <span style="color:${statusColor}">● ${data.matched ? statusLabel : 'unmatched'}</span>
                    ${data.speed != null ? `<span>${data.speed} km/h</span>` : ''}
                    ${run ? `<span class="live-fleet-dest">→ ${run.siteName}</span>` : ''}
                </div>
            </div>`;
    }).join('');

    listEl.querySelectorAll('.live-fleet-row').forEach(row => {
        row.addEventListener('click', () => {
            const truckId = row.dataset.truck;
            const data = fleetLiveData[truckId];
            if (map && data && data.lat != null) map.setView([data.lat, data.lng], 12);
        });
    });
}

function setupLiveFleetControls() {
    const toggleBtn = document.getElementById('live-tracking-toggle-btn');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleLiveTracking);

    ['dispatched', 'idle', 'offline', 'all'].forEach(key => {
        const cb = document.getElementById(`filter-${key}`);
        if (!cb) return;
        cb.addEventListener('change', () => {
            liveFleetFilters[key] = cb.checked;
            if (key === 'all' && cb.checked) {
                ['dispatched', 'idle', 'offline'].forEach(k => {
                    liveFleetFilters[k] = false;
                    const otherCb = document.getElementById(`filter-${k}`);
                    if (otherCb) otherCb.checked = false;
                });
            } else if (cb.checked) {
                liveFleetFilters.all = false;
                const allCb = document.getElementById('filter-all');
                if (allCb) allCb.checked = false;
            }
            renderLiveFleetMarkers();
            renderLiveFleetList();
        });
    });

    const searchEl = document.getElementById('live-fleet-search');
    if (searchEl) searchEl.addEventListener('input', renderLiveFleetList);
}

// ---------------------------------------------------------------
// GEOFENCES TAB — multi-file KML upload/paste
// ---------------------------------------------------------------
function setupGeofenceControls() {
    const fileInput = document.getElementById('geofence-file-input');
    const pasteBtn = document.getElementById('geofence-paste-btn');
    const pasteArea = document.getElementById('geofence-paste-area');

    if (fileInput) {
        fileInput.addEventListener('change', async (e) => {
            const files = Array.from(e.target.files || []);
            let allZones = [];
            const perFileErrors = [];
            for (const file of files) {
                try {
                    const text = await file.text();
                    allZones = allZones.concat(parseKmlGeofences(text));
                } catch (err) {
                    perFileErrors.push(`${file.name}: ${err.message}`);
                }
            }
            fileInput.value = '';
            if (allZones.length > 0) {
                const summary = ingestGeofenceZones(allZones);
                showGeofenceIngestSummary(summary, perFileErrors);
            } else if (perFileErrors.length > 0) {
                alert('Could not read any zones:\n' + perFileErrors.join('\n'));
            }
            renderGeofenceList();
        });
    }

    if (pasteBtn && pasteArea) {
        pasteBtn.addEventListener('click', () => {
            const text = pasteArea.value.trim();
            if (!text) { alert('Paste KML content first.'); return; }
            try {
                const zones = parseKmlGeofences(text);
                const summary = ingestGeofenceZones(zones);
                showGeofenceIngestSummary(summary, []);
                pasteArea.value = '';
                renderGeofenceList();
            } catch (err) {
                alert(`Couldn't parse pasted KML: ${err.message}`);
            }
        });
    }

    renderGeofenceList();
    setupManualSiteControls();
}

// ---------------------------------------------------------------
// MANUAL SITE ENTRY — add a destination directly by client/name/coords,
// no KML needed. This is the fast path for a brand-new site.
// ---------------------------------------------------------------
let manuallyAddedSiteIds = [];

// Mirrors the same decimal/DMS parsing logic used for the original bulk
// site import, but runs client-side since this is typed in live.
function parseManualCoordinates(raw) {
    raw = (raw || '').trim();

    const decMatch = raw.match(/^(-?\d{1,3}(?:\.\d+)?)\s*,\s*(-?\d{1,3}(?:\.\d+)?)$/);
    if (decMatch) {
        const lat = parseFloat(decMatch[1]), lng = parseFloat(decMatch[2]);
        if (Math.abs(lat) <= 90 && Math.abs(lng) <= 180) return { lat, lng };
    }

    const dmsMatch = raw.match(/(\d+)[°\s]+(\d+)['\s]+([\d.]+)"?\s*([NSEW])[,\s]+(\d+)[°\s]+(\d+)['\s]+([\d.]+)"?\s*([NSEW])/i);
    if (dmsMatch) {
        const [, d1, m1, s1, h1, d2, m2, s2, h2] = dmsMatch;
        const toDec = (d, m, s, h) => {
            let v = Number(d) + Number(m) / 60 + Number(s) / 3600;
            if (h.toUpperCase() === 'S' || h.toUpperCase() === 'W') v = -v;
            return v;
        };
        const v1 = toDec(d1, m1, s1, h1), v2 = toDec(d2, m2, s2, h2);
        if (h1.toUpperCase() === 'N' || h1.toUpperCase() === 'S') return { lat: v1, lng: v2 };
        return { lat: v2, lng: v1 };
    }

    return null;
}

function saveManualSite() {
    const clientEl = document.getElementById('manual-site-client');
    const nameEl = document.getElementById('manual-site-name');
    const coordsEl = document.getElementById('manual-site-coords');
    const resultEl = document.getElementById('manual-site-result');

    const client = clientEl.value.trim();
    const name = nameEl.value.trim();
    const rawCoords = coordsEl.value.trim();

    if (!name || !rawCoords) {
        resultEl.innerHTML = `<div class="wialon-result error">Site name and coordinates are required.</div>`;
        return;
    }

    const parsed = parseManualCoordinates(rawCoords);
    if (!parsed) {
        resultEl.innerHTML = `<div class="wialon-result error">Couldn't read those coordinates. Try decimal format like "36.6417633, 3.2927783", or DMS like 36°38'30"N 3°17'34"E.</div>`;
        return;
    }

    const id = 'site_manual_' + Date.now();
    const site = {
        id, name, client: client || null,
        lat: parsed.lat, lng: parsed.lng,
        accuracy: 'exact', dupSuspect: false, manuallyAdded: true
    };
    constructionSites.push(site);
    manuallyAddedSiteIds.push(id);

    // Add to the map immediately
    if (map && siteClusterGroup) {
        const marker = L.marker([site.lat, site.lng], {
            icon: L.divIcon({ className: 'site-glow-marker', iconSize: [14, 14], iconAnchor: [7, 7] })
        });
        marker.bindPopup(`<b>🏗️ ${site.name}</b><br>${site.client || ''}<br><i style="color:#4ade80">✏️ manually added</i>`);
        marker.addTo(siteClusterGroup);
        siteMarkers[id] = marker;
    }

    // Refresh every dropdown that lists destinations
    refreshAllSiteDropdowns();
    renderManualSiteList();

    resultEl.innerHTML = `<div class="wialon-result success">✅ "${site.name}" added — it's on the map and ready to dispatch to.</div>`;
    clientEl.value = '';
    nameEl.value = '';
    coordsEl.value = '';
}

function removeManualSite(id) {
    const idx = constructionSites.findIndex(s => s.id === id);
    if (idx === -1) return;
    constructionSites.splice(idx, 1);
    manuallyAddedSiteIds = manuallyAddedSiteIds.filter(sid => sid !== id);

    if (siteMarkers[id]) {
        if (siteClusterGroup) siteClusterGroup.removeLayer(siteMarkers[id]);
        delete siteMarkers[id];
    }
    refreshAllSiteDropdowns();
    renderManualSiteList();
}

// Rebuilds every <select> that lists destination sites — used whenever a
// site is added or removed after initial page load.
function refreshAllSiteDropdowns() {
    const siteSelect = document.getElementById('site-select');
    const querySiteSelect = document.getElementById('queue-site-select');
    if (siteSelect) {
        const currentSearch = document.getElementById('site-search')?.value || '';
        siteSelect.innerHTML = '<option value="">-- Select Destination Site --</option>';
        populateSiteDropdown();
        if (currentSearch) filterSelect(masterSiteOptions, siteSelect, currentSearch);
    }
    if (querySiteSelect) {
        querySiteSelect.innerHTML = '<option value="">-- Select Destination --</option>';
        constructionSites.filter(s => s.id !== 'site_0').forEach(site => {
            let opt = document.createElement('option');
            opt.value = site.id;
            opt.textContent = site.client ? `${site.name} — ${site.client}` : site.name;
            querySiteSelect.appendChild(opt);
        });
    }
}

function renderManualSiteList() {
    const listEl = document.getElementById('manual-site-list');
    if (!listEl) return;
    if (manuallyAddedSiteIds.length === 0) {
        listEl.innerHTML = `<div style="padding:14px; color:var(--text-dim); font-size:.85rem;">No manually added sites yet.</div>`;
        return;
    }
    listEl.innerHTML = manuallyAddedSiteIds.map(id => {
        const site = constructionSites.find(s => s.id === id);
        if (!site) return '';
        return `
            <div class="geofence-row">
                <span>✏️ ${site.name}${site.client ? ` — ${site.client}` : ''}</span>
                <span style="color:var(--text-dim); font-size:.75rem;">${site.lat.toFixed(5)}, ${site.lng.toFixed(5)}</span>
                <button class="geofence-remove-btn" data-id="${site.id}">✕</button>
            </div>`;
    }).join('');
    listEl.querySelectorAll('.geofence-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => removeManualSite(btn.dataset.id));
    });
}

function setupManualSiteControls() {
    const saveBtn = document.getElementById('manual-site-save-btn');
    if (saveBtn) saveBtn.addEventListener('click', saveManualSite);
    renderManualSiteList();
}

function showGeofenceIngestSummary(summary, fileErrors) {
    const el = document.getElementById('geofence-ingest-summary');
    if (!el) return;

    let html = `<div class="wialon-result success">
        ✅ Matched ${summary.matchedCount} site zone(s)${summary.matchedFactoryCount > 0 ? ` + ${summary.matchedFactoryCount} factory zone(s)` : ''} of ${summary.totalCount} total &mdash; added to the map.
        ${summary.duplicateCount > 0 ? `<div class="detail">${summary.duplicateCount} zone(s) skipped — already loaded (same name as an existing zone).</div>` : ''}
        ${summary.unmatched.length > 0 ? `<div class="detail">${summary.unmatched.length} zone(s) didn't match your site list and were skipped. Some may be genuinely old — but some may be real clients missing from the original site list, so worth a look rather than assuming.</div>` : ''}
    </div>`;

    if (summary.unmatched.length > 0) {
        html += `<details style="margin-top:8px;">
            <summary style="cursor:pointer; font-size:.8rem; color:var(--text-dim);">Show ${summary.unmatched.length} unmatched zone name(s)</summary>
            <div class="wialon-unit-list" style="margin-top:6px;">
                ${summary.unmatched.slice(0, 200).map(n => `<div>⚪ ${n}</div>`).join('')}
                ${summary.unmatched.length > 200 ? `<div style="color:var(--text-dim)">...and ${summary.unmatched.length - 200} more</div>` : ''}
            </div>
        </details>`;
    }

    if (fileErrors.length > 0) {
        html += `<div class="wialon-result error" style="margin-top:8px;">${fileErrors.join('<br>')}</div>`;
    }

    el.innerHTML = html;
}

function renderGeofenceList() {
    const listEl = document.getElementById('geofence-list');
    if (!listEl) return;
    if (geofences.length === 0) {
        listEl.innerHTML = `<div style="padding:14px; color:var(--text-dim); font-size:.85rem;">No geofences loaded yet.</div>`;
        return;
    }
    listEl.innerHTML = geofences.map(g => `
        <div class="geofence-row">
            <span>${g.kind === 'factory' ? '🏭' : '📍'} ${g.name}</span>
            <span style="color:var(--text-dim); font-size:.75rem;">${g.polygon.length} pts</span>
            ${g.kind !== 'factory' ? `<button class="geofence-remove-btn" data-id="${g.id}">✕</button>` : ''}
        </div>
    `).join('');
    listEl.querySelectorAll('.geofence-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => removeGeofence(btn.dataset.id));
    });
}

// ---------------------------------------------------------------
// DISPATCH QUEUE — batch-assign multiple trucks to multiple
// destinations, then execute all at once.
// ---------------------------------------------------------------
let dispatchQueue = []; // [{ truckId, siteId, driverName }]

function addToDispatchQueue() {
    const truckId = document.getElementById('queue-truck-select').value;
    const siteId = document.getElementById('queue-site-select').value;
    if (!truckId || !siteId) {
        alert('Pick both a truck and a destination to add to the queue.');
        return;
    }
    if (dispatchQueue.find(q => q.truckId === truckId)) {
        alert(`${truckId} is already in the queue.`);
        return;
    }
    const site = constructionSites.find(s => s.id === siteId);
    const driverName = fleetLiveData[truckId] && fleetLiveData[truckId].driverName;
    dispatchQueue.push({ truckId, siteId, siteName: site.name, client: site.client || null, driverName: driverName || null });
    renderDispatchQueue();
}

function removeFromDispatchQueue(truckId) {
    dispatchQueue = dispatchQueue.filter(q => q.truckId !== truckId);
    renderDispatchQueue();
}

function renderDispatchQueue() {
    const tbody = document.getElementById('queue-tbody');
    const emptyEl = document.getElementById('queue-empty');
    const startBtn = document.getElementById('queue-start-btn');
    if (!tbody) return;

    if (dispatchQueue.length === 0) {
        tbody.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
        if (startBtn) startBtn.disabled = true;
        return;
    }
    if (emptyEl) emptyEl.style.display = 'none';
    if (startBtn) startBtn.disabled = false;

    tbody.innerHTML = dispatchQueue.map(q => `
        <tr>
            <td class="truck-cell">${q.truckId}</td>
            <td>${q.client || '—'}</td>
            <td>${q.siteName}</td>
            <td>${q.driverName || '—'}</td>
            <td><span class="status-pill dispatched"><span class="status-dot"></span>READY</span></td>
            <td><button class="row-actions queue-remove-btn" data-truck="${q.truckId}">Remove</button></td>
        </tr>
    `).join('');

    tbody.querySelectorAll('.queue-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => removeFromDispatchQueue(btn.dataset.truck));
    });
}

function startQueuedDispatch() {
    if (dispatchQueue.length === 0) return;
    if (!map) {
        alert("The map hasn't loaded — can't calculate routes right now.");
        return;
    }

    let delay = 0;
    dispatchQueue.forEach(q => {
        // Stagger route calculations slightly so we don't fire a burst of
        // simultaneous OSRM requests for a large batch all at once.
        setTimeout(() => dispatchSingleQueueEntry(q), delay);
        delay += 400;
    });

    setTimeout(() => switchView('fleet'), delay + 200);

    dispatchQueue = [];
    renderDispatchQueue();
}

function dispatchSingleQueueEntry(q) {
    const targetSite = constructionSites.find(s => s.id === q.siteId);
    if (!targetSite || targetSite.lat == null || targetSite.lng == null) {
        console.warn(`Skipping ${q.truckId} — no coordinates for ${q.siteName}`);
        return;
    }
    const destinationCoords = [targetSite.lat, targetSite.lng];

    const rc = L.Routing.control({
        waypoints: [L.latLng(AMOUDA_COORDS[0], AMOUDA_COORDS[1]), L.latLng(destinationCoords[0], destinationCoords[1])],
        lineOptions: { styles: [{ color: '#6d5bff', weight: 4, opacity: 0.7 }] },
        createMarker: function () { return null; },
        addWaypoints: false,
        show: false
    }).addTo(map);

    rc.on('routesfound', function (e) {
        const route = e.routes[0];
        if (activeRuns[q.truckId]) {
            activeRuns[q.truckId].routeLine = route.coordinates.map(c => [c.lat, c.lng]);
            activeRuns[q.truckId].routeTotalDistance = route.summary.totalDistance;
            activeRuns[q.truckId].routeTotalTime = route.summary.totalTime;
        }
    });

    activeRuns[q.truckId] = {
        siteId: targetSite.id, siteName: targetSite.name, client: targetSite.client,
        routeCoords: destinationCoords, marker: null, dispatchedAt: new Date(),
        lastVerifiedAt: null, lastCoords: null
    };

    const activeSelect = document.getElementById('active-trucks');
    if (activeSelect) {
        const existingOpt = Array.from(activeSelect.options).find(o => o.value === q.truckId);
        if (existingOpt) existingOpt.remove();
        let opt = document.createElement('option');
        opt.value = q.truckId;
        opt.textContent = targetSite.client ? `${q.truckId} (➡️ ${targetSite.name} — ${targetSite.client})` : `${q.truckId} (➡️ ${targetSite.name})`;
        activeSelect.appendChild(opt);
    }

    updateStatsDisplays();
    renderFleetTable();
}

function setupDispatchQueueControls() {
    const truckSelect = document.getElementById('queue-truck-select');
    const siteSelect = document.getElementById('queue-site-select');
    const addBtn = document.getElementById('queue-add-btn');
    const startBtn = document.getElementById('queue-start-btn');

    if (truckSelect) {
        fleetTrucks.forEach(truck => {
            let opt = document.createElement('option');
            opt.value = truck;
            opt.textContent = truck;
            truckSelect.appendChild(opt);
        });
    }
    if (siteSelect) {
        constructionSites.filter(s => s.id !== 'site_0').forEach(site => {
            let opt = document.createElement('option');
            opt.value = site.id;
            opt.textContent = site.client ? `${site.name} — ${site.client}` : site.name;
            siteSelect.appendChild(opt);
        });
    }
    if (addBtn) addBtn.addEventListener('click', addToDispatchQueue);
    if (startBtn) startBtn.addEventListener('click', startQueuedDispatch);

    renderDispatchQueue();
}

// ---------------------------------------------------------------
// HISTORY TAB — completed runs, daily summary export/print
// ---------------------------------------------------------------
function renderHistoryTable() {
    const tbody = document.getElementById('history-tbody');
    const emptyEl = document.getElementById('history-empty');
    if (!tbody) return;

    const today = new Date();
    const todaysRuns = runHistory.filter(r => isSameCalendarDay(r.stoppedAt, today));

    const totalEl = document.getElementById('history-total-today');
    const devEl = document.getElementById('history-deviations-today');
    const speedEl = document.getElementById('history-speeding-today');
    const factoryEl = document.getElementById('history-factory-today');
    if (totalEl) totalEl.textContent = todaysRuns.length;
    if (devEl) devEl.textContent = todaysRuns.filter(r => r.hadDeviation).length;
    if (speedEl) speedEl.textContent = todaysRuns.filter(r => r.hadSpeeding).length;
    if (factoryEl) factoryEl.textContent = todaysRuns.filter(r => r.reachedFactory).length;

    if (runHistory.length === 0) {
        tbody.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
        return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    tbody.innerHTML = runHistory.slice().reverse().map(r => {
        const durationMin = Math.round((r.stoppedAt - r.dispatchedAt) / 60000);
        let outcome = r.reachedFactory ? '🏭 Reached factory' : r.reachedSite ? '🟢 Reached site' : 'Stopped early';
        if (r.hadDeviation) outcome += ' &middot; ⚠️ had deviation';
        if (r.hadSpeeding) outcome += ' &middot; 🟠 exceeded 90km/h';
        return `
            <tr>
                <td class="truck-cell">${r.truckId}</td>
                <td>${r.client || '—'}</td>
                <td>${r.siteName}</td>
                <td>${r.driverName || '—'}</td>
                <td>${r.dispatchedAt.toLocaleString()}</td>
                <td>${r.stoppedAt.toLocaleString()}</td>
                <td>${durationMin} min</td>
                <td>${outcome}</td>
            </tr>`;
    }).join('');
}

function csvEscape(s) {
    if (s == null) return '';
    const str = String(s);
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return '"' + str.replace(/"/g, '""') + '"';
    }
    return str;
}

function exportHistoryCsv() {
    const today = new Date();
    const rows = runHistory.filter(r => isSameCalendarDay(r.stoppedAt, today));
    if (rows.length === 0) {
        alert("No completed runs today yet — nothing to export.");
        return;
    }
    const header = ['Truck', 'Client', 'Destination', 'Driver', 'Dispatched At', 'Stopped At', 'Duration (min)', 'Reached Factory', 'Reached Site', 'Had Deviation', 'Exceeded Speed Limit'];
    const csvRows = [header.join(',')];
    rows.forEach(r => {
        const durationMin = Math.round((r.stoppedAt - r.dispatchedAt) / 60000);
        csvRows.push([
            csvEscape(r.truckId), csvEscape(r.client), csvEscape(r.siteName), csvEscape(r.driverName),
            csvEscape(r.dispatchedAt.toLocaleString()), csvEscape(r.stoppedAt.toLocaleString()), durationMin,
            r.reachedFactory ? 'Yes' : 'No', r.reachedSite ? 'Yes' : 'No', r.hadDeviation ? 'Yes' : 'No', r.hadSpeeding ? 'Yes' : 'No'
        ].join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dispatch-summary-${today.toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
}

function printDailySummary() {
    const today = new Date();
    const rows = runHistory.filter(r => isSameCalendarDay(r.stoppedAt, today));
    const printArea = document.getElementById('print-summary-area');
    if (!printArea) return;

    if (rows.length === 0) {
        alert("No completed runs today yet — nothing to print.");
        return;
    }

    const deviations = rows.filter(r => r.hadDeviation).length;
    const speedingCount = rows.filter(r => r.hadSpeeding).length;
    const reachedFactory = rows.filter(r => r.reachedFactory).length;

    printArea.innerHTML = `
        <h1>OMD Fleet — Daily Dispatch Summary</h1>
        <p>${today.toLocaleDateString()} &middot; ${rows.length} completed run(s) &middot; ${deviations} had a route deviation &middot; ${speedingCount} exceeded ${SPEED_LIMIT_KMH}km/h &middot; ${reachedFactory} returned to factory</p>
        <table>
            <thead><tr>
                <th>Truck</th><th>Client</th><th>Destination</th><th>Driver</th>
                <th>Dispatched</th><th>Stopped</th><th>Duration</th><th>Outcome</th>
            </tr></thead>
            <tbody>
                ${rows.map(r => {
                    const durationMin = Math.round((r.stoppedAt - r.dispatchedAt) / 60000);
                    let outcome = r.reachedFactory ? 'Reached factory' : r.reachedSite ? 'Reached site' : 'Stopped early';
                    if (r.hadDeviation) outcome += ' (had deviation)';
                    if (r.hadSpeeding) outcome += ' (exceeded speed limit)';
                    return `<tr>
                        <td>${r.truckId}</td><td>${r.client || ''}</td><td>${r.siteName}</td><td>${r.driverName || ''}</td>
                        <td>${r.dispatchedAt.toLocaleTimeString()}</td><td>${r.stoppedAt.toLocaleTimeString()}</td>
                        <td>${durationMin} min</td><td>${outcome}</td>
                    </tr>`;
                }).join('')}
            </tbody>
        </table>
    `;
    window.print();
}

function setupHistoryControls() {
    const csvBtn = document.getElementById('history-export-csv-btn');
    const printBtn = document.getElementById('history-print-btn');
    if (csvBtn) csvBtn.addEventListener('click', exportHistoryCsv);
    if (printBtn) printBtn.addEventListener('click', printDailySummary);
    renderHistoryTable();
}

// ---------------------------------------------------------------
// NOTIFICATIONS LOG TAB
// ---------------------------------------------------------------
function renderNotificationsLog() {
    const tbody = document.getElementById('notiflog-tbody');
    const emptyEl = document.getElementById('notiflog-empty');
    if (!tbody) return;

    if (notificationLog.length === 0) {
        tbody.innerHTML = '';
        if (emptyEl) emptyEl.style.display = 'block';
        return;
    }
    if (emptyEl) emptyEl.style.display = 'none';

    const icons = { factory: '🟣', site: '🟢', offroute: '🔴', speeding: '🟠' };
    tbody.innerHTML = notificationLog.slice().reverse().slice(0, 300).map(n => `
        <tr>
            <td>${n.time.toLocaleTimeString()}</td>
            <td>${icons[n.kind] || '•'} ${n.kind}</td>
            <td class="truck-cell">${n.truckId}</td>
            <td>${n.message}</td>
        </tr>
    `).join('');

    const dashLatest = document.getElementById('dashboard-latest-notifs');
    if (dashLatest) {
        if (notificationLog.length === 0) {
            dashLatest.innerHTML = `<div style="color:var(--text-dim); font-size:.85rem; padding:10px;">No notifications yet this session.</div>`;
        } else {
            dashLatest.innerHTML = notificationLog.slice().reverse().slice(0, 6).map(n => `
                <div class="dash-notif-row">
                    <span>${icons[n.kind] || '•'}</span>
                    <span class="truck-cell" style="font-size:.8rem;">${n.truckId}</span>
                    <span style="color:var(--text-dim); font-size:.78rem; flex:1;">${n.message}</span>
                    <span style="color:var(--text-dim); font-size:.72rem;">${n.time.toLocaleTimeString()}</span>
                </div>
            `).join('');
        }
    }
}

function setupNotificationsLogControls() {
    renderNotificationsLog();
}

// ---------------------------------------------------------------
// DASHBOARD TAB
// ---------------------------------------------------------------
function computeDriverRatings() {
    const byDriver = {};
    runHistory.forEach(r => {
        const name = r.driverName || `(${r.truckId})`;
        if (!byDriver[name]) byDriver[name] = { name, totalRuns: 0, deviations: 0, speedingCount: 0, cleanRuns: 0 };
        byDriver[name].totalRuns++;
        if (r.hadDeviation) byDriver[name].deviations++;
        if (r.hadSpeeding) byDriver[name].speedingCount++;
        if (!r.hadDeviation && !r.hadSpeeding) byDriver[name].cleanRuns++;
    });
    return Object.values(byDriver)
        .map(d => ({ ...d, score: d.totalRuns > 0 ? Math.round((d.cleanRuns / d.totalRuns) * 100) : 100 }))
        .sort((a, b) => b.totalRuns - a.totalRuns);
}

function renderDashboard() {
    // Connection status
    const config = getWialonConfig();
    const connEl = document.getElementById('dash-connection-status');
    if (connEl) {
        const configured = !!(config.relay && config.server && config.token);
        connEl.innerHTML = configured
            ? `<span style="color:var(--green)">● Wialon configured</span>`
            : `<span style="color:var(--text-dim)">○ Wialon not configured — set up on the Wialon Test tab</span>`;
    }
    const pollEl = document.getElementById('dash-poll-status');
    if (pollEl) {
        pollEl.textContent = (liveTrackingEnabled || notificationsEnabled)
            ? `Live polling active — checking every ${POLL_INTERVAL_MS / 60000} min`
            : 'Live polling is off (enable Live Fleet or Arrival alerts to start)';
    }

    // Fleet motion state
    const values = Object.values(fleetLiveData);
    const moving = values.filter(d => d.status === 'moving').length;
    const idle = values.filter(d => d.status === 'idle').length;
    const offline = fleetTrucks.length - moving - idle;
    document.getElementById('dash-moving').textContent = moving;
    document.getElementById('dash-idle').textContent = idle;
    document.getElementById('dash-offline').textContent = offline;
    document.getElementById('dash-total').textContent = fleetTrucks.length;

    // Active dispatches summary
    const activeEntries = Object.entries(activeRuns);
    document.getElementById('dash-active-count').textContent = activeEntries.length;
    const activeListEl = document.getElementById('dash-active-list');
    if (activeListEl) {
        if (activeEntries.length === 0) {
            activeListEl.innerHTML = `<div style="color:var(--text-dim); font-size:.85rem; padding:10px;">No active dispatches right now.</div>`;
        } else {
            activeListEl.innerHTML = activeEntries.slice(0, 8).map(([truckId, run]) => `
                <div class="dash-notif-row">
                    <span class="truck-cell" style="font-size:.8rem;">${truckId}</span>
                    <span style="color:var(--text-dim); font-size:.78rem; flex:1;">→ ${run.siteName}</span>
                    <span style="font-size:.72rem; color:${run.lastOnRoute === false ? 'var(--red)' : 'var(--text-dim)'}">${run.lastOnRoute === false ? 'off route' : 'on route'}</span>
                </div>
            `).join('');
        }
    }

    // Latest notifications (reuses the same render call)
    renderNotificationsLog();

    // Driver ratings
    const ratings = computeDriverRatings();
    const ratingsEl = document.getElementById('dash-driver-ratings-tbody');
    const ratingsEmptyEl = document.getElementById('dash-ratings-empty');
    if (ratingsEl) {
        if (ratings.length === 0) {
            ratingsEl.innerHTML = '';
            if (ratingsEmptyEl) ratingsEmptyEl.style.display = 'block';
        } else {
            if (ratingsEmptyEl) ratingsEmptyEl.style.display = 'none';
            ratingsEl.innerHTML = ratings.map(d => `
                <tr>
                    <td>${d.name}</td>
                    <td>${d.totalRuns}</td>
                    <td>${d.deviations}</td>
                    <td>${d.speedingCount > 0 ? `<span style="color:var(--red)">${d.speedingCount}</span>` : '0'}</td>
                    <td><span class="status-pill ${d.score >= 90 ? 'verified' : d.score >= 70 ? 'dispatched' : 'off-route'}">${d.score}%</span></td>
                </tr>
            `).join('');
        }
    }
}

function setupDashboardControls() {
    renderDashboard();
}

// ---------------------------------------------------------------
// MONITORING TAB — full-page truck+driver search, all 84 trucks
// ---------------------------------------------------------------
function renderMonitoringTable() {
    const tbody = document.getElementById('monitoring-tbody');
    if (!tbody) return;

    const searchText = (document.getElementById('monitoring-search')?.value || '').toLowerCase();
    const activeFilter = document.querySelector('.monitoring-filter-btn.active')?.dataset.filter || 'all';

    let rows = fleetTrucks.filter(truckId => {
        const data = fleetLiveData[truckId] || { status: 'offline', matched: false };
        if (activeFilter === 'dispatched' && !activeRuns[truckId]) return false;
        if (activeFilter === 'moving' && data.status !== 'moving') return false;
        if (activeFilter === 'idle' && data.status !== 'idle') return false;
        if (activeFilter === 'offline' && data.status !== 'offline') return false;
        return true;
    });

    if (searchText) {
        rows = rows.filter(truckId => {
            const data = fleetLiveData[truckId] || {};
            return truckId.toLowerCase().includes(searchText) ||
                (data.driverName && data.driverName.toLowerCase().includes(searchText));
        });
    }

    document.getElementById('monitoring-count').textContent = `${rows.length} / ${fleetTrucks.length}`;

    if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-dim); padding:30px;">No trucks match.</td></tr>`;
        return;
    }

    tbody.innerHTML = rows.map(truckId => {
        const data = fleetLiveData[truckId] || { status: 'offline', matched: false };
        const run = activeRuns[truckId];
        const isOffRoute = run && run.lastDeviationBasis === 'route' && run.lastOnRoute === false;
        let statusClass, statusLabel;
        if (isOffRoute) { statusClass = 'off-route'; statusLabel = '🔴 off-route'; }
        else if (data.status === 'moving') { statusClass = 'verified'; statusLabel = '🟢 moving'; }
        else if (data.status === 'idle') { statusClass = 'unknown-route'; statusLabel = '🔵 idle'; }
        else { statusClass = 'dispatched'; statusLabel = '⚪ offline'; }

        return `
            <tr class="monitoring-row" data-truck="${truckId}">
                <td class="truck-cell">${truckId}</td>
                <td>${data.driverName || '—'}</td>
                <td><span class="status-pill ${statusClass}">${statusLabel}</span></td>
                <td>${data.speed != null ? data.speed + ' km/h' : '—'}</td>
                <td>${run ? run.siteName : '—'}</td>
                <td>${data.ageMinutes != null ? data.ageMinutes + 'min ago' : '—'}</td>
                <td><button class="row-actions monitoring-locate-btn" data-truck="${truckId}">Locate</button></td>
            </tr>`;
    }).join('');

    tbody.querySelectorAll('.monitoring-locate-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const truckId = btn.dataset.truck;
            const data = fleetLiveData[truckId];
            switchView('dispatch');
            if (data && data.lat != null && map) {
                setTimeout(() => { map.invalidateSize(); map.setView([data.lat, data.lng], 12); }, 60);
            }
        });
    });
}

function setupMonitoringControls() {
    const searchEl = document.getElementById('monitoring-search');
    if (searchEl) searchEl.addEventListener('input', renderMonitoringTable);

    document.querySelectorAll('.monitoring-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.monitoring-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMonitoringTable();
        });
    });

    renderMonitoringTable();
}


// ---------------------------------------------------------------
// THEME SWITCHER — Dark / Light / Black, applied to the whole app
// (not just the map). Session-only, like everything else right now.
// ---------------------------------------------------------------
function setTheme(name) {
    document.documentElement.setAttribute('data-theme', name);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === name);
    });
}

function setupThemeToggle() {
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => setTheme(btn.dataset.theme));
    });
}



// ==========================================
// 🌍 INTERNATIONALIZATION (EN / FR / AR)
// ==========================================
const I18N = {
en: {
"brand.title": "Fleet Route Monitor",
"brand.subtitle": "OMD Transport · Amouda Line",
"tab.dashboard": "Dashboard",
"tab.dispatch": "Dispatch",
"tab.monitoring": "Monitoring",
"tab.queue": "Queue",
"tab.fleet": "Active Fleet",
"tab.history": "History",
"tab.notifications": "Notifications",
"tab.settings": "Settings",
"topbar.active": "Active",
"set.title": "Settings",
"set.desc": "Language, appearance, geofences, Wialon connection and monitoring thresholds.",
"set.language": "Language",
"set.appearance": "Appearance",
"set.theme": "Theme",
"set.themeDark": "Dark theme",
"set.themeLight": "Light theme",
"set.themeBlack": "Black theme",
"set.thresholds": "Monitoring & Alerts",
"set.speedLimit": "Speed limit (km/h)",
"set.deviationBuffer": "Route deviation buffer (m)",
"set.arrivalBuffer": "Site arrival buffer (m)",
"set.pollInterval": "Live polling interval (seconds)",
"set.geofences": "Geofences & Sites",
"set.geoDesc": "Add a new destination site directly, or bulk-import real zone shapes from Wialon KML exports.",
"set.addSite": "➕ Add a new site",
"set.clientName": "Client name",
"set.clientPh": "e.g. EL BAYRAK EQUIPE 1 MATIN",
"set.siteName": "Site / destination name",
"set.sitePh": "e.g. ANNABA",
"set.coords": "Coordinates",
"set.coordsPh": "e.g. 36.6417633, 3.2927783",
"set.saveSite": "Save site",
"set.bulkImport": "📦 Bulk import from Wialon (KML)",
"set.uploadKml": "Upload KML file(s)",
"set.pasteKml": "...or paste KML content directly",
"set.pastePh": "Paste raw KML XML here",
"set.addPasted": "Add from pasted KML",
"set.manualSites": "Manually added sites",
"set.loadedZones": "Loaded KML zones",
"set.wialon": "Wialon Connection",
"set.wialonDesc": "Paste your token to confirm it authenticates and can see your fleet. Nothing here is saved to the file.",
"set.relay": "Relay URL",
"set.server": "Wialon server",
"set.token": "API token",
"set.tokenPh": "Paste your Wialon token here",
"set.testBtn": "Test Connection"
},
fr: {
"brand.title": "Moniteur d'Itinéraires Flotte",
"brand.subtitle": "Transport OMD · Ligne Amouda",
"tab.dashboard": "Tableau de bord",
"tab.dispatch": "Répartition",
"tab.monitoring": "Suivi",
"tab.queue": "File",
"tab.fleet": "Flotte active",
"tab.history": "Historique",
"tab.notifications": "Notifications",
"tab.settings": "Paramètres",
"topbar.active": "Actifs",
"set.title": "Paramètres",
"set.desc": "Langue, apparence, géoclôtures, connexion Wialon et seuils de suivi.",
"set.language": "Langue",
"set.appearance": "Apparence",
"set.theme": "Thème",
"set.themeDark": "Thème sombre",
"set.themeLight": "Thème clair",
"set.themeBlack": "Thème noir",
"set.thresholds": "Suivi & Alertes",
"set.speedLimit": "Limite de vitesse (km/h)",
"set.deviationBuffer": "Marge de déviation (m)",
"set.arrivalBuffer": "Marge d'arrivée au site (m)",
"set.pollInterval": "Intervalle de rafraîchissement (s)",
"set.geofences": "Géoclôtures & Sites",
"set.geoDesc": "Ajoutez un nouveau site de destination, ou importez en lot des formes de zones depuis des exports KML Wialon.",
"set.addSite": "➕ Ajouter un nouveau site",
"set.clientName": "Nom du client",
"set.clientPh": "ex. EL BAYRAK EQUIPE 1 MATIN",
"set.siteName": "Nom du site / destination",
"set.sitePh": "ex. ANNABA",
"set.coords": "Coordonnées",
"set.coordsPh": "ex. 36.6417633, 3.2927783",
"set.saveSite": "Enregistrer le site",
"set.bulkImport": "📦 Import groupé depuis Wialon (KML)",
"set.uploadKml": "Télécharger le(s) fichier(s) KML",
"set.pasteKml": "...ou coller directement le contenu KML",
"set.pastePh": "Coller le XML KML brut ici",
"set.addPasted": "Ajouter depuis le KML collé",
"set.manualSites": "Sites ajoutés manuellement",
"set.loadedZones": "Zones KML chargées",
"set.wialon": "Connexion Wialon",
"set.wialonDesc": "Collez votre jeton pour confirmer qu'il fonctionne et voit votre flotte. Rien n'est enregistré ici.",
"set.relay": "URL du relais",
"set.server": "Serveur Wialon",
"set.token": "Jeton API",
"set.tokenPh": "Collez votre jeton Wialon ici",
"set.testBtn": "Tester la connexion"
},
ar: {
"brand.title": "مراقب مسارات الأسطول",
"brand.subtitle": "نقل OMD · خط عمودة",
"tab.dashboard": "لوحة التحكم",
"tab.dispatch": "الإرسال",
"tab.monitoring": "المراقبة",
"tab.queue": "قائمة الانتظار",
"tab.fleet": "الأسطول النشط",
"tab.history": "السجل",
"tab.notifications": "الإشعارات",
"tab.settings": "الإعدادات",
"topbar.active": "نشط",
"set.title": "الإعدادات",
"set.desc": "اللغة والمظهر والمناطق الجغرافية واتصال Wialon وعتبات المراقبة.",
"set.language": "اللغة",
"set.appearance": "المظهر",
"set.theme": "السمة",
"set.themeDark": "سمة داكنة",
"set.themeLight": "سمة فاتحة",
"set.themeBlack": "سمة سوداء",
"set.thresholds": "المراقبة والتنبيهات",
"set.speedLimit": "حد السرعة (كم/س)",
"set.deviationBuffer": "هامش انحراف المسار (م)",
"set.arrivalBuffer": "هامش الوصول للموقع (م)",
"set.pollInterval": "الفاصل الزمني للتحديث (ثانية)",
"set.geofences": "المناطق الجغرافية والمواقع",
"set.geoDesc": "أضف موقع وجهة جديدًا مباشرة، أو استورد أشكال مناطق حقيقية من ملفات KML الخاصة بـ Wialon.",
"set.addSite": "➕ إضافة موقع جديد",
"set.clientName": "اسم العميل",
"set.clientPh": "مثال: EL BAYRAK EQUIPE 1 MATIN",
"set.siteName": "اسم الموقع / الوجهة",
"set.sitePh": "مثال: ANNABA",
"set.coords": "الإحداثيات",
"set.coordsPh": "مثال: 36.6417633, 3.2927783",
"set.saveSite": "حفظ الموقع",
"set.bulkImport": "📦 استيراد جماعي من Wialon (KML)",
"set.uploadKml": "رفع ملفات KML",
"set.pasteKml": "...أو الصق محتوى KML مباشرة",
"set.pastePh": "الصق نص KML الخام هنا",
"set.addPasted": "إضافة من KML الملصق",
"set.manualSites": "المواقع المضافة يدويًا",
"set.loadedZones": "مناطق KML المحمّلة",
"set.wialon": "اتصال Wialon",
"set.wialonDesc": "الصق رمزك للتأكد من أنه يعمل ويرى أسطولك. لا يُحفظ شيء هنا.",
"set.relay": "عنوان Relay",
"set.server": "خادم Wialon",
"set.token": "رمز API",
"set.tokenPh": "الصق رمز Wialon هنا",
"set.testBtn": "اختبار الاتصال"
}
};
let currentLang = 'en';
function t(key) {
  const d = I18N[currentLang] || I18N.en;
  if (d[key] !== undefined) return d[key];
  if (I18N.en[key] !== undefined) return I18N.en[key];
  return key;
}
function applyI18n() {
  document.documentElement.lang = currentLang;
  document.documentElement.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-ph')));
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.setAttribute('title', t(el.getAttribute('data-i18n-title')));
  });
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === currentLang);
  });
}
function setLanguage(lang) {
  if (!I18N[lang]) lang = 'en';
  currentLang = lang;
  try { localStorage.setItem('omd_lang', lang); } catch (e) {}
  applyI18n();
}

// ==========================================
// ⚙️ SETTINGS CONTROLS
// ==========================================
function syncSettingsInputs() {
  const s = document.getElementById('set-speed-limit');
  const d = document.getElementById('set-deviation-buffer');
  const a = document.getElementById('set-arrival-buffer');
  const p = document.getElementById('set-poll-interval');
  if (s) s.value = SPEED_LIMIT_KMH;
  if (d) d.value = ROUTE_BUFFER_METERS;
  if (a) a.value = SITE_ARRIVAL_BUFFER_METERS;
  if (p) p.value = Math.round(POLL_INTERVAL_MS / 1000);
}
function setupSettingsControls() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  const speedEl = document.getElementById('set-speed-limit');
  const devEl = document.getElementById('set-deviation-buffer');
  const arrEl = document.getElementById('set-arrival-buffer');
  const pollEl = document.getElementById('set-poll-interval');
  if (speedEl) speedEl.addEventListener('change', () => {
    SPEED_LIMIT_KMH = Math.min(200, Math.max(10, parseInt(speedEl.value) || 90));
  });
  if (devEl) devEl.addEventListener('change', () => {
    ROUTE_BUFFER_METERS = Math.min(5000, Math.max(50, parseInt(devEl.value) || 400));
  });
  if (arrEl) arrEl.addEventListener('change', () => {
    SITE_ARRIVAL_BUFFER_METERS = Math.min(5000, Math.max(50, parseInt(arrEl.value) || 300));
  });
  if (pollEl) pollEl.addEventListener('change', () => {
    POLL_INTERVAL_MS = Math.min(600, Math.max(10, parseInt(pollEl.value) || 60)) * 1000;
    if (typeof updatePollingState === 'function') updatePollingState();
  });
}
