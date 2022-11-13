require 'open-uri'

puts "Destroying tables..."
# Unnecessary if using `rails db:seed:replant`
Kudo.destroy_all
Comment.destroy_all
Ride.destroy_all
User.destroy_all

puts "Resetting primary keys..."
# For easy testing, so that after seeding, the first `User` has `id` of 1
ApplicationRecord.connection.reset_pk_sequence!('users')

puts "Creating users..."
# Create profile pics for seeding users
pic_1 = URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/profile_1.jpg')

profile_pics = [
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210530_160249.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190238(2).jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210605_130446.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210701_190934.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/PXL_20220924_191312598.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210711_195635.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190328.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210513_180408.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210716_175550.jpg'), 
  URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210727_190714.jpg')
]


# Create one user with an easy to remember username, email, and password:
puts "Creating demo user..."
demo_user = User.create!( 
  email: 'demo@user.io',
  name: 'Derek Demoman', 
  password: 'password'
)
puts "Attaching photo for demo user..."
demo_user.profile_pic.attach(io: pic_1, filename: 'profile_pic')

# More users
puts "Creating more users..."

i = 0
while i < 4
  user = User.create!({
    email: i.to_s + 'tester@demo.com',
    name: Faker::Name.unique.name,
    password: 'password'
  }) 
  puts "Attaching photo..."
  user.profile_pic.attach(io: profile_pics[i], filename: 'profile_pic')
  i += 1
puts "Completed a user"

end

# # rides
puts "Creating rides..."

ride_1 = Ride.create!({
  date_time: DateTime.now,
  title: "East Bay rip",
  description: "",
  athlete_id: User.all[1].id,
  distance: 30.1,
  elevation: 184.6,
  duration: 102,
  gps_points:
   ["34.300048828125",
    "125.6980209350586",
    "123.1660842895508",
    "121.9192276000977",
    "104.6449432373047",
    "97.37663269042969",
    "97.01118469238281",
    "103.5167007446289",
    "100.4323959350586",
    "115.0639953613281",
    "84.72535705566406",
    "62.17524719238281",
    "50.25984954833984",
    "51.46689224243164",
    "52.07720947265625",
    "48.3326301574707",
    "38.69163131713867",
    "32.44166946411133",
    "32.63211822509766",
    "32.31182098388672",
    "16.89996337890625",
    "15.3891773223877",
    "15.70347023010254",
    "18.33942222595215",
    "17.18544387817383",
    "22.34053611755371",
    "26.86161804199219",
    "32.99846649169922",
    "32.66130828857422",
    "38.2540283203125",
    "48.82435607910156",
    "90.74333953857422",
    "131.7082977294922",
    "123.4383926391602",
    "99.06208801269531",
    "104.9474411010742",
    "97.07195281982422",
    "112.1211853027344",
    "124.1594161987305"],
  polyline:
      "y{ofFtaegVqAEAfEOtBw@|D_A~BuAxBg@h@o@l@cBbAyAj@cCj@yBd@_ALyB@eD@wAAiC^mAZm@\\eA
    p@_C`@UBDb@b@lFLhCExBSdB{AdIaAfFg@pBuAzDi@fAoFvMcCjGeA|BgBfCcBvCaGrMuMrY}CnGcBxEg@z
    At@bAlAdBlDhGlElGdMfQnCbE~@rB~@zDZ~D?pDIvAmBjMoF|\\iBhOc@fESjEA~BRxFx@hPf@vKxAxXZbC
    PdA_@VONKJ{@hA{AzCaArBeBpEw@bBuAlBaA`AyBxAiClByAvAkA~@sElDu@`@oBhCcFxF[\\mAoBmAeBqC
    qD{@mAMRuFtHiCcDa@Ws@BSGw@q@aAwASTi@dA]dC_@nAm@z@_BwB}BaBcHaD}@zCsD_BmDoBmAi@uCkAUM
    cAmA_L}NcBiBmEqFcBwBiAdBiIxLtE`GtBlCJNBnG@zD?lCNbQ?jGP|\\BrGjAAJD@DDzAj@?WtAI`@XT^V
    ]fBWpAa@zBSfAKHUfA]dBUjAuAlHy@jExD~A|\\lLjGxBh@`@NTp@rBLhA{@~BUt@BjABfAETmBlD_AnAIh
    @Fh@tAhBZPh@D~BJdCbAf@C~CqAfCcAdASt@v@xDvEhBzBp@x@iGlCaAb@}EtB_HtAZ~AF`AD~Ab@`EbAtC
    J~AXtAhD|GtCgCzDcDjCuBxEsEfKcK~@eA`AeAjCkBdB}@dGoB~C_AfEoAd@OrAiA\\[]ZsAhAe@NeAZNfC
    VbEl@fBp@r@hBz@bD|AZNtBxDtAlC`ApBdAzBpF}E~K}JdKeJbKeJdKcJ\\ITStCgCpBiBn@s@BMfB}ArJ{
    IhGuF`FqEfAaAoA}CiDwH_C`BsAdBC@C@i@m@Qc@Pb@h@l@BABArAeB~BaBhDvHnA|CxBoBzHaHt@c@bHmG
    xDmD`@_@[{@e@aBi@iDiGcc@oAwGy@_Di@uA{AuBaB}A{AcAiDcBiC_BcCqBiCiCgBwBsCgE_A{AoBqCiAk
    AsA_AmBaAyBk@wBQcA?}BJeDRcCFsCYaASoEgB_EkB_BmAcCkCgBuCs@yAkAsDa@{A[uCa@uGiAeUkB{`@A
    mDJaCVaC^aC|@yHn@cFhBmLdFs[JiA@SRB?UBu@?w@EaABOt@]lAq@tAqAd@m@p@cB`ByETm@HA|Ax@JCnA
    gBNGrBiBt@oA`@OTE?g@@_@A}JBqXDqU?iCBmD~AA|EBTBNJVn@t@zEb@b@VFnA@@uBWiB"
})

ride_2 = Ride.create!({
  date_time: DateTime.now,
  title: "Over the Aps",
  description: "Great forests up here.",
  athlete_id: User.all[0].id,
  distance: 52.6,
  elevation: 1147.3,
  duration: 363,
  gps_points:
   ["22.2327880859375",
    "532.8405151367188",
    "486.3567199707031",
    "465.6201477050781",
    "417.4456176757812",
    "442.5802001953125",
    "481.5501403808594",
    "468.3788757324219",
    "497.3052673339844",
    "508.4036560058594",
    "554.7076416015625",
    "706.0482177734375",
    "827.4690551757812",
    "936.1867065429688",
    "1142.156982421875",
    "1117.879150390625",
    "1132.784790039062",
    "1103.390502929688",
    "1203.336669921875",
    "1250.934814453125",
    "1214.1708984375",
    "1217.367065429688",
    "1167.286010742188",
    "1052.085815429688",
    "952.648681640625",
    "858.1165161132812",
    "769.23291015625",
    "795.9553833007812",
    "869.9915771484375",
    "940.6549682617188",
    "1012.958557128906",
    "948.250732421875",
    "880.8098754882812",
    "865.9065551757812",
    "785.1957397460938",
    "719.7947998046875",
    "646.1299438476562",
    "606.9564819335938",
    "594.4016723632812"],
  polyline:
   "wy~uEt}maOdE_E`CsGe@oEaBm@RoBbCiAHcGxB{AJmBrClAl@_A{C{FyAmGiBy@DeD_CiCnK^zK}FfC
iA|D`D~BDvAaCbHkBvDgNhBcKrAu@BgDN{DjA{@rD}Fq@aCjDlBjX_QlDyE~@}GrCsGB}IxC`BfFgFrAaA}
BsCuAqKqCmAeLyMeFd@u@}Dz@yBcK}AeC_AKcH?cJy@sA_JkOiE{M_M_IeG{GuCgFo@cDgDh@r@kAl@gCmF
uIwAsAfAmB|CoMyAwF}Es@yJ|@}DzDuCe@qEcF}GsHsBiEaCuHaCaAcBkFgMzBkMjEgDvD_FoA{@pA{DUiE
\\iBwAgRuK_BuDTeImSyYkL{H{EmA{BiEsCoNmEoGaKyMyHsHGwHfFkCfEuD`HMgEmC{Fs@eBb@oEmBmBW`
CqAvFc@zGd@~DKtBoBlEeCnLKpSsItAgEoCkI_BwPh@gGxJsFtGwGrFeLDeWgCma@mIkJcIkO}AiIoDiJoE
{CbD_HtAuKvGu[d@wDoEgFeEkBk@yEiCqSjAoVAoGmAsGaAsFz@wKP}S~A{QlIyPxL_SrAyTbDyJsAqH{Ce
AiBd@gDv@gO`BuMqC}GqCc@gGqD}SsC_PSuIaA{D`FlBz@~BpAuCvBsEuAoNj@yJsGiLaEmB_@}Bd@eCxE_
CpBoBUqFrHaCjAwC}AyKtDaDx@_JeBcSC}FyAqGcC}Bl@uKAvCbC|BjCwIpDeHzBkB\\iFkBb@yApBqE{Ja
Fz@aJNcI}BaL_O{BmCGeG_D{AcCmC_CnLqAzLl@tM{J|C|C|J~@dFyO}FiE}CqEzCuEg@_BuDpAwKv@c@`@
fAEjEjAzBlC{AnKgKkB_KpAsKjBqM`@uItAaOxEcDjFnHtAn@pCu@pEqElKmEfPn@|DeByAqBpAxA~@xBfF
?jQrDvBr@tE@tHaDp@iAb@kF~E{HvEsGhAaHq@kD~AmE|E{CfEeEvCuJbEyHdEcAvCdBvAZzChCItFl@jDf
Bf@hBkC|CXvAMx@bD_@dHvA~C`Ck@zImAzDtHxC`AhBu@tD}FrJcDpEk@rCsFbEmEz@cInC}Gi@aC`C{DzC
qF\\{GqA}EjDC|AUf@{CIeCyBm@rBwE_DkKr@gEG{BzBkAzBeDlAsOpBeHsAgByGiBc@mLgFo@cEaLcGs@I
cCqAaBv@s@xQpLtDXzAkApCyAfDrFbJvDlMuAzMhDtJiApD|@lAoA`DaEdDNxC|F|@lQnHpRdDdF|GLfKHt
JdGdMxPdNzHnK~MpBd@vAsBzBsFxHsPfHwFhCrA"
})

ride_3 = Ride.create({
  date_time: DateTime.now,
  title: "Tahoe Ride",
  description: "Views up here are so good!",
  athlete_id: User.all[2].id,
  distance: 15.3,
  elevation: 740.9,
  duration: 108,
  gps_points:
   ["028.679443359375",
    "2066.013427734375",
    "2092.90380859375",
    "2118.179443359375",
    "2137.52197265625",
    "2160.07666015625",
    "2203.5244140625",
    "2253.6357421875",
    "2294.90087890625",
    "2339.579833984375",
    "2360.57373046875",
    "2406.23583984375",
    "2431.91845703125",
    "2448.19140625",
    "2431.61328125",
    "2402.747802734375",
    "2358.744873046875",
    "2335.07763671875",
    "2287.563232421875",
    "2244.522705078125",
    "2193.7978515625",
    "2161.046630859375",
    "2131.9794921875",
    "2120.16552734375",
    "2092.11279296875",
    "2090.4404296875",
    "2073.520751953125",
    "2069.21728515625",
    "2116.912109375",
    "2153.800048828125",
    "2171.44287109375",
    "2191.70654296875",
    "2238.878662109375",
    "2256.31884765625",
    "2290.415283203125",
    "2311.529296875",
    "2347.052001953125",
    "2370.485595703125",
    "2379.822509765625"],
  polyline:
   "obtlFhp`{UbK_HHa@Ka@o@]oEmAqGgBgC{@eB_Ai@@oARoAC_@MMISYTWZWtAa@~Ac@rBJhCj@hBNj@
@nBXpDLb@?dBDnAmAZFVPbAFp@@NK`@I^RVtAb@t@f@l@hAxCfAdBzAhAbEpBdGzClB|AZr@Jv@F\\N?CwB
Ey@a@_Bg@wAiBiB{A}BKe@?QRCXXr@p@vA|@p@HhANh@^~CtC\\TbAIl@k@rByBzB_BjC{AtBkCfAYfAAJR
HdAXp@dAfCVFB[qA_DKq@NoALg@VHIx@DjAbAfAdAI^Wf@o@RA^UBYEo@Q]i@y@uA_CFUd@d@`Ab@\\ALO?
UQcCTyBt@eBJq@Am@Mk@Yk@gA{@kB}BgBwAUYG]DmBCgAYu@_@a@GEFD^`@Xt@BfA@jCTX`Av@fBpBxAtAV
PXj@NxAKp@g@bAYrAEdCLzAMN]@aAc@e@e@GTt@lA|@bB\\d@@hA_@TS@g@n@_@VeAHo@i@S]EkAHy@WIMf
@OnAJp@z@rBTj@CZWGa@qA}@gBIeAKSgA@gAXuBjC_@TkBdA{B~AaDdDcAH]U_DuCi@_@{BYkCoBYYSB?PJ
d@z@nAtAdBr@p@f@vA`@~ADx@BvBO?G]Kw@[s@mB}AcCkAaEyBcD_B{@q@gAeBiAyCg@m@c@u@WuA_@Sa@H
OJq@AcAGWQ[Go@j@_@`@]GkB@qDMoBYqBIoBe@uC[u@J{Cz@[VUVWKiA[oBMkBKS?k@k@e@a@q@_@q@Q{@B
WFIDWc@U_@EOAs@AeAQ_@a@Sk@SeBy@YcBqAiCk@q@u@Qo@E]iAa@gAs@QaAKw@_@CCw@mBsA}@{@{@iAi@
{AE_BTe@GoA?kCa@WQF]J@IUOw@_@_@o@eA[}@WiBB{Ah@{BHk@Xg@Ve@Dw@IW}@i@eASy@W_@[aAy@[]Oe
@H_Ap@cALyAIaAWe@{@q@o@e@c@Kw@sAa@qAg@kAO_AgA]qA]aAc@Ke@Bm@VcBl@kAHeAOm@Uc@[[][Ek@L
mAVo@Di@Me@y@q@CUPA~@J@_@MSYgA[g@Y_@eAWeBk@y@Mg@`@]Xc@AEg@]_@Ua@Ca@A{CEwAOe@mA_BoA{
AkA{Ac@SY[o@gAw@qB[sAU{@k@o@sBiBgA}@a@oBQy@@cA@cBSuAXgCt@uBx@sBbAkB`AqAA}C\\cCEUJy@
EWLm@XsBfAeB|@oBf@kA^}CGaABm@XuADk@@m@Jg@t@wAh@a@h@Q`@IfAD`B\\lA@fABhB]V?\\VTJRGD}@
c@y@kCwCi@e@GMF[RQIw@Ba@XVJSEc@Bg@Ko@RgAR]Cg@"
})

ride_4 = Ride.create!({
  date_time: DateTime.now,
  title: "Oakland Hills Ride",
  description: "Great time with friends!",
  athlete_id: User.all[3].id,
  distance: 10.9,
  elevation: 190.6,
  duration: 50,
  gps_points:
   ["6.47451400756836",
    "19.04798316955566",
    "25.36993217468262",
    "36.94055938720703",
    "51.66233825683594",
    "58.91906356811523",
    "78.14954376220703",
    "89.36811065673828",
    "104.7026062011719",
    "117.1891937255859",
    "126.6043014526367",
    "147.1294097900391",
    "165.2747192382812",
    "186.1005554199219",
    "190.0283966064453",
    "182.5561981201172",
    "171.8420562744141",
    "177.1620635986328",
    "172.8637542724609",
    "167.2935180664062",
    "163.5412902832031",
    "157.0696411132812",
    "148.5576324462891",
    "145.414306640625",
    "156.3005828857422",
    "149.7397003173828",
    "147.8255157470703",
    "120.1988677978516",
    "96.13525390625",
    "79.7223129272461",
    "77.51957702636719",
    "78.36819458007812",
    "73.47083282470703",
    "54.6387939453125",
    "48.17452239990234",
    "36.37003707885742",
    "34.98102188110352",
    "33.5512809753418",
    "32.09531021118164"],
  polyline:
   "{uyeF|vbiVd@dAPr@sEcAmK}BiCm@uAYa@SuAYmAWQJkBb@}@XqAf@iA`@y@Vg@HuAH_ABg@BMBSLW^
Qf@q@IQU[UUKk@ISIYUO]Ea@B_AFuAu@z@w@x@Ds@?i@wAwICgC?{ACiCScEKuA_@uB@Uf@aBHM?_A?oD\\
cGqA{D]iAWc@QWUQMKGOE[CiACaCLgBZuBJo@Rq@vAwBr@_A|@kAXq@Lk@ViBFgB?yACi@Ik@g@sBcA}DIq
@?iACm@My@Q]]_@{AcAe@UYG_@@a@ASGE?E?a@OWM_@]S]Ka@QqC]yGIaB?wBDk@Rw@zAeGf@}BVo@PYTOF
EDe@KKYSc@SoBeA_@S{BkCiA|@WNK?UMe@wAs@}AS]s@_A]q@ESJmAxAf@j@h@NRzAtC`AzAdCzC}A`AcDr
B_Ax@kBdCw@x@q@j@oA~@gBnAi@h@fAdCu@n@i@Ly@Xe@^sBtBeCrBw@r@MNQ`@KREHY^i@b@o@`@aAb@[J
KD[La@h@SV]d@a@dAuAtEsAtEi@fB_@fAa@r@_@h@Y^[\\MXUt@I`@GzAFnAJh@N\\Zj@Zp@@L@j@Cj@\\?
L@LJRl@vAdFv@@h@CNCNSp@aA@SBKCJARZfA`@nANh@LTHLPb@v@hBBBJ@?Z?N@|BBZp@jBDZGb@Sb@i@d@
]Zu@x@}@nBqAtCO\\E`@Cr@TpAFtBAlDAdB@j@Ff@Nr@P`@tCnFNZpAvKXtBj@xB~BfIzA`Fp@vBrBxGBP@
v@BfDA~@xCbBlAl@z@h@h@TnCvAtC`BzAv@hAj@KvGM~HIlHM~ETtF?F?GUuFvCE|AG\\ARDrDp@tGfA"
})

ride_5 = Ride.create!({
  date_time: DateTime.now,
  title: "Ride through the Parks",
  description: "Such a great day today!",
  athlete_id: User.all[0].id,
  distance: 19.9,
  elevation: 189.9,
  duration: 77,
  gps_points:
   ["4.98037719726562",
    "33.19312286376953",
    "44.09541702270508",
    "65.03820037841797",
    "74.10758972167969",
    "68.65164947509766",
    "45.10093688964844",
    "31.90658187866211",
    "23.53355026245117",
    "39.14422988891602",
    "78.08551025390625",
    "82.9806137084961",
    "83.39303588867188",
    "98.10796356201172",
    "102.8092880249023",
    "94.0145492553711",
    "98.02750396728516",
    "88.66409301757812",
    "85.2458267211914",
    "85.5589828491211",
    "89.70899200439453",
    "75.84761047363281",
    "52.60578918457031",
    "43.70677185058594",
    "56.4394416809082",
    "77.30219268798828",
    "63.84547805786133",
    "68.77933502197266",
    "74.0118408203125",
    "75.12830352783203",
    "75.2967529296875",
    "80.82484436035156",
    "74.11178588867188",
    "72.61006927490234",
    "73.01654815673828",
    "75.0997543334961",
    "73.981689453125",
    "52.40796661376953",
    "45.11493301391602"],
  polyline:
   "ipoeFjbujVwAiGy@mCWuAe@uDe@eCaAeHOs@a@c@}@e@QMGHo@LOBOOSTIFSFaDD]P[ZIDeJZc@@IsE
IwEc@@mCHgAByBF}Vx@aL\\[q@MOaDaBE@C^G?IU}@JmBB}CRmDNaB?MFEJGZ[e@W_@KQUeAKgAOq@E]Ha@
h@gAf@mANu@Bo@MyACc@@EGa@Ka@EKg@y@a@a@q@YqAG[DWwAIu@Ao@Jw@ViAAgDSwLOsEa@mBYu@m@eAy@
{@eAq@{@[eCm@_FkAcH}AcBMs@QoCmAs@IuAJgBJUEUOw@cBSY[Qm@IgA[qAq@u@gBe@W[@SFgBn@]Fe@I}
D_B}AUaAKm@YcAy@c@Yc@SXgALm@GaAa@qBCoAiBWFkCDuB?K?JEtBClAC|@PBlBVvA?b@Od@_@Zg@J[HMN
FFBF@V@l@MzBk@KpAGx@GlAhE`BbAf@JFb@@x@Nn@b@~A`B^b@PHb@DbAYd@Y\\c@z@}An@}@vAkBTMVGPG
d@_@HUFc@KsAQw@_BeDMa@Eq@HcDOu@o@mAU{@QgCiAyCKs@@[Jm@t@gAP_@De@Ge@Sc@k@q@[yAYgBYk@y
AyAQe@QaADkBDy@P]bBiBZWzA}@Rg@h@}DNs@TW|BaAzCoC@a@VIRMh@u@Rk@L_ABeAH{@fAcDNSREzBJh@
Bl@ErAe@r@AVZRn@d@tAlACc@cHOqBJAhBUjFo@eBeXwDyk@aB}V]sF~@Ml@?hC[lAOb@EAOOgCEs@QkClC
]bHy@fJgAdIaAh@bIb@vG?|@dEg@pJgAhGu@jBSVfEHlADl@b@GvC]dDa@jEg@jDa@PCB\\f@lHd@tHj@tI
j@~ItB~[PbAfBzFbBzFXvA@zCKnBQrCPDdA|@Xv@Pt@BFnBEJH`@T\\@AD?Lv@Gr@I\\M@FH`@PfAFh@?HF
Hn@\\l@j@`A|AZZ\\NRj@YP}@\\c@L}@TEYOw@O]IIoAKnAJHHN\\Nv@DX|@Ub@M|@]XQSk@]OKIOQaA}Am
@k@o@]s@K]DMH{@`Bk@p@_@NyAEOAWGAOMo@ESM[Q[[[{@a@m@MG~@OvAYA?^ALUtC[jDaAjG{ArHUpBKbB
NfIXtEh@vC`B`DvClFr@~BFz@OrAc@jB_CbJQnA?`AL|CBLR?X@@VX~BFVZ`BdAlDL^Ib@VdAb@bBH\\TMZ
rAVtAb@lDFVVd@ZnA^dAHfBr@lAFRJjARlAF^?rBHfA@dBr@rEb@`Ez@~Fd@bCx@vCr@tDZtAf@vATv@h@|
CH~@AfC"
})

ride_6 = Ride.create!({
  date_time: DateTime.now,
  title: "Marin headlands ride",
  description: "Awesome views up there!",
  athlete_id: User.all[2].id,
  distance: 17.1,
  elevation: 442.8,
  duration: 81,
  gps_points:
   ["4.9392318725586",
    "62.44776153564453",
    "23.52758026123047",
    "33.45735549926758",
    "46.8661003112793",
    "56.06896209716797",
    "69.22212982177734",
    "90.17343139648438",
    "121.0961456298828",
    "147.0116424560547",
    "68.43539428710938",
    "62.18670654296875",
    "48.21484375",
    "34.05364227294922",
    "15.97139739990234",
    "44.22726440429688",
    "56.60236740112305",
    "73.18458557128906",
    "88.3013916015625",
    "70.21018981933594",
    "72.57398223876953",
    "46.64800643920898",
    "14.04834270477295",
    "34.13851928710938",
    "51.18770217895508",
    "60.92412185668945",
    "66.44414520263672",
    "170.7699127197266",
    "114.0447235107422",
    "87.89876556396484",
    "67.14682006835938",
    "54.89408111572266",
    "43.52426910400391",
    "31.77167129516602",
    "61.87781524658203",
    "60.26120376586914",
    "52.02633285522461",
    "109.7970199584961",
    "108.838508605957"],
  polyline:
   "wm{eFhnxjVU?OKK?w@UiAg@y@IUNs@x@UV_@HiB`@UFGCIQ?WHi@EO_@_@Ya@?[HSh@IPG`@y@`@c@x
@s@EO}AFgBn@MM?Kj@gAJa@@k@GQUC}Al@AQTe@Ri@R}@LsABm@RwDLoDCsBUsCWsAgBwGmFcSQgAGuBOsD
i@eBY_@WSkDwAcAc@m@a@sA}Am@cAYkAo@wD{@oBkAgByD}Fe@o@cAk@uA{@gBkBoB}B}B{Fy@sByAkCcAw
BCs@LcAxMad@fBaH^iBL_Bb@_CPk@d@kAbAaB`@e@JY@UIKcCBaBi@i@_@k@q@u@cB[kCFsH?gBKoA]kAy@
sA_Ao@s@Us@Gu@DcFjB}@VqAFoASoA[gBg@w@?oADkDt@u@d@wA`BIRCfACvDCnAIVm@HaCAChC?f@o@AiB
AkBAqDA{BASMEMg@mCc@cCUa@]Y{@EyBFKLQJODOV[nA[j@UFiCEe@XMZOzA]TaAXoFr@GFD@z@^bAj@Cx@
CjAP`ADn@BzA~@`D^xANfACl@e@v@_@dADR\\`@jAdAXr@VjAFd@Ge@WkAYs@m@m@{@y@Ae@Zs@d@w@Bm@O
gAmAuEQe@Cm@E}AMe@NSp@}@zBeAp@OnAeAh@}@^QnAP^Bd@S~@kAR_@x@v@z@zAPj@@nAF`AjA`B\\`@F\
\Bl@C|@LFl@{@v@e@b@O`@[l@?jB@`@?@k@@iCn@@jB@b@??m@@yAB}E`C@l@IHWBoABwDBgAHSvAaBt@e@
jDu@nAEv@?fBf@nAZnARpAGrFsBl@Ot@Er@Fr@T~@n@X^n@tALh@JnAEpFAhDJpANx@\\~@bAtAtAv@t@Pb
CCHJATKXeBfCe@jAQj@c@~BM~A_@hBgB`HcDrKwFlRgA~DC|@Px@nCbFzCbIZj@nB|BfBjBtAz@bAj@d@n@
v@hAlEzGz@nBn@vDXjAl@bArA|Al@`@bAb@jDvAVRX^Xn@VjBNrFPfArAdFfExOpAnFNYRaBj@uD^iAXiB\
\@f@LlBl@r@PXAR@^P`@NXGr@DFHNFh@v@n@h@|@P^?h@U^MHBHKJ@PCf@YXKx@Bx@Bp@Ev@iATKPEb@gAV
a@T[R_ANWXIj@M`@oALB\\LCBBAKK]G[v@GVMFw@NYp@Sv@UVe@z@Qd@UHYL[f@MTSBw@A_A@YEYJg@X@b@
J\\B`@K\\S\\EHS`@U^Id@Mj@RjA`@tAv@nBRtAEnAI@KGCH?fA@dBAzAm@dEDLr@t@^t@~@jFPnBOpAu@z
Ag@tCGnB]xA"
})

ride_7 = Ride.create!({
  date_time: DateTime.now,
  title: "Muddy Ride in Santa Cruz",
  description: "Was nice seeing the crew again",
  athlete_id: User.all[4].id,
  distance: 18.8,
  elevation: 339.7,
  duration: 90,
  gps_points:
   ["5.5218505859375",
    "18.15930366516113",
    "55.39936065673828",
    "95.30595397949219",
    "108.2414703369141",
    "133.3932495117188",
    "162.8419342041016",
    "168.8512268066406",
    "197.9272003173828",
    "218.2245941162109",
    "247.5488128662109",
    "268.1857299804688",
    "292.4677734375",
    "307.9776916503906",
    "311.8767395019531",
    "293.7576904296875",
    "294.1452026367188",
    "277.4150695800781",
    "247.1490478515625",
    "210.1449279785156",
    "185.4742889404297",
    "183.8996276855469",
    "185.5204620361328",
    "186.40087890625",
    "165.071533203125",
    "138.0118560791016",
    "97.3512954711914",
    "73.88317108154297",
    "29.6041431427002",
    "36.12622451782227",
    "42.73811340332031",
    "25.92582511901855",
    "24.36741638183594",
    "37.81940460205078",
    "38.70566940307617",
    "32.45083999633789",
    "18.25923538208008",
    "20.87139701843262",
    "28.06555366516113"],
  polyline:
   "efr`FzschVkBRmC@a@GaAa@cBq@eAAo@E_Ai@aAgAe@o@s@q@gFsDgAa@gAQiAwAaA_@o@SQQQo@SqA
aA[_Ak@mCsCc@e@[OiA]q@Ms@iA][_@OiAU_@Qu@m@aAaAk@gBSk@U[qBiBu@_AgAmB_@Yc@Au@Bw@Oc@Qe
@_@i@Sq@o@_@o@UEeAHi@Em@Gs@e@u@k@WGy@]qBkAcAEa@U[ASL]d@gAl@}DbDeHfGoDvFq@^}@j@wAlAq
@`AU`@a@Uo@Wy@Ag@@w@CMZJbA\\jBD~A?PI\\e@r@En@?bAGRYTu@\\a@DkBJmBHgBRsAZaDf@uAJo@Kk@
WmEoB[Km@@yAN}@GoBJs@Ga@OeCW_C?uDLoAVuDFeCCoCHmANu@Tu@`@SVUbAS\\_Az@qDdDiE|Ds@h@mDl
@o@@yC[eA_@y@AiBFgEj@gBM{@Tg@`@i@v@W@mBBcAYgB_@cCFmA`@eAAm@A[Iq@SeEDgAFQ@_AU[_@YWQV
z@|@bBbBv@bBx@dAtAlA|AvBdBzDb@\\fBb@bAZb@H|@d@j@^t@`@vEtBbBxA`A^jBPhBX`A\\`Ad@|Ax@p
A|AjBpAtBS`Ap@?t@b@pALd@F`AHb@LJR?^OlAWj@B|BfA\\^z@b@\\b@Rb@p@`@|@jAZVn@RbC~BpAx@x@
N~Bl@rEdBfHhF`BdA|@XdAPnCPrDLdAAd@a@v@oAv@c@v@Cf@N`Ar@\\\\\\v@r@tDPNNB^Pn@f@ZB^Jf@l
@TP`@Hb@@NZH^QjCYpAa@nAu@rBIxATv@t@Nx@v@Pn@K~@m@b@_@RM`@ItAHvAhAtBdB~ErAjBdAjB~BvG^
fAn@vAZb@p@b@p@J`@EpBm@tAk@xA_@z@KbCIhBFfAXr@d@bBlAn@Xh@LdAGrAKVHb@^^pAC~@RbAN|@`At
AvApBb@Zd@Nx@DjAKrB?^DZXPn@Df@OtDFn@XX`@L~Bn@~Bt@`Ad@fAVjCt@xA`Bl@`@XHRJb@Nn@XN^@d@
Kz@g@pCEl@StAO`EShAe@dC[z@DLF@j@U`@KZMR@n@?RBb@Lc@MSCo@?SA[La@Jk@TGAEMLa@LYd@eCRiAN
aERuADm@f@qCJ{@Ae@O_@o@Yc@OIK^Bd@@vALZGXSz@w@j@i@d@_AXOTBh@Pf@CHCXeA\\qAfAj@fBsFvEw
NrBkH~EoStAaGz@yCv@oBzAsCpCoFt@iBbAgDj@qCvEe]f@sDf@{ER}DBqD?qBK{CgAkOWcDOc@I{Ci@aY?
qLD}Lb@@@q@@oAHeCDyGBeIOiB"
})

ride_8 = Ride.create!({
  date_time: DateTime.now,
  title: "Tahoe Epic",
  description: "I need to hit the ice bath after this one.",
  athlete_id: User.all[1].id,
  distance: 56.4,
  elevation: 1421.3,
  duration: 295,
  gps_points:
   ["018.46923828125",
    "1979.292114257812",
    "1993.040405273438",
    "1997.964111328125",
    "2029.946655273438",
    "2084.16552734375",
    "2210.07275390625",
    "2362.526611328125",
    "2399.0302734375",
    "2496.54931640625",
    "2519.719970703125",
    "2410.2822265625",
    "2364.117431640625",
    "2247.541748046875",
    "2110.90283203125",
    "2046.642333984375",
    "1983.986328125",
    "1979.357788085938",
    "2024.143188476562",
    "2046.938720703125",
    "2176.592529296875",
    "2307.139404296875",
    "2342.625732421875",
    "2426.938232421875",
    "2490.590087890625",
    "2570.408447265625",
    "2638.56640625",
    "2802.938232421875",
    "2860.229736328125",
    "2849.915283203125",
    "2805.70703125",
    "2718.495361328125",
    "2564.66455078125",
    "2417.726318359375",
    "2316.427734375",
    "2148.164794921875",
    "2047.326904296875",
    "1983.648193359375",
    "1960.925048828125"],
  polyline:
   "ultlF~z`{UlDeFdEqBnCpHhNna@lLnYhHiDr[{FfLgBnBtEvDxCjJ~BrJpHpFvJbDfBrBiDnG}Am@zB
bBfFrJwInNuEjMuKpLYdEuAfC}EhGsHfAIa@gEtAgIl@kB~BgGe@cGXuL`GiTLoYE{KlFqNnC{J_AMgCo@z
CS`AgHz@aDiEqFgEsWi@}PcEcUcC{K?uLv@oBbBbAfJxUjMB|GCpF`ErK~EbV`Qj@fAb@uAd@eEtA~FdCa@
vLpItEwEnIoBbHuEe@gE{@iDtCkGI|ByAtEfAzDcDrFuRlIgDAaG}DwCy@cAReA}Dw@?TlEm@s@WJiSmN{K
mImF]gHeEePdAkF}PgGyFcAhIjBnKhEzPf@dHBhPfEhVdGjL{BdK{Bx@|C^uCjGwEbQy@~ElAvCdBArAxG~
EhBChD~HjK{Br\\\\bI~E`WdA~XeBdXvDxExApAAxDtEG_BdFvAPtKq@fArIlBtEtD|ArC`Ae@nBv@pCfAr
IrFlMhAdAdAC@kBxAcA`B^xCdHIrFhAEpGzNfOw@fEeFvJyJz@oC?oC~A}C|D@bCPvD}DnHeDdC_Ct@|@hB
aArBzB|@fDx@eAR{@h@i@rJa@nCuF_BcDS_BlEaCJmCzAwCc@sIsDqDyCk@s@_BsAeAr@q@xKPi@wBzJqAp
U}ElM}RyAbAvF}LmBsOvCmO|LaIEtHpFuCxBXrAaFnJmAfDcCjIiLUcD^e@dCd@r@jCuCxLhEjIfFpAhKwC
Vg@xEaFo@aBdBiL~BqZWcObEaFe@iDUiK`@kHtHqQpSiS`DgB~A[dA@bC}@zFoF|FqO~BeDpAx@v@hCbIfE
vEmBTnG~HfKtA~MpCsAtA}@z@xC|@nQbOhCxBKb@|CbBpN~AUjDzAdBcDrFlJhPxLnErD`Dm@~CwB`EnBhA
tMyAzPmFzLnCtGxKpUIzHuC`AwBlEyA~ToAjPhClB{EfLgArS^fDvKjOaAxC}CXqED_AbD_LxAuD{@qAoBo
B_@uBkG{FrHoAdGzBfL_MrHaCzA[zGgJ`CeDdFrDlVoClTzCbCmDhGsFjOUyAm@HwDz@qFgB{@aDmBCeCzC
uBpBsMfEqESiBxAmAtC{Dy@}E`IiGdCDcB}GdFiBfFgBfCcClAaGaCeIjB_ECoCjFmDpEKjDgHlCoJq@}Cw
IwBeBeDtAsCy@_BwEaH}D_OqOcHeCmH_A{HjAyFz@}@|DkDtGWfCgMM_Jr@r@nIZfQaB`CwA]qA`AcGwB{A
jAsDC_D|DkCtFpFbH`B|A"
})

ride_9 = Ride.create!({
  date_time: DateTime.now,
  title: "Crested Butte",
  description: "So gorgeous around here!",
  athlete_id: User.all[3].id,
  distance: 39.4,
  elevation: 1201.7,
  duration: 231,
  gps_points:
   ["828.20556640625",
    "2803.591552734375",
    "2776.532470703125",
    "2750.804931640625",
    "2710.88134765625",
    "2701.012939453125",
    "2704.517578125",
    "2706.9931640625",
    "2712.52880859375",
    "2724.12890625",
    "2739.290283203125",
    "2734.277099609375",
    "2749.12353515625",
    "2775.72802734375",
    "2773.65966796875",
    "2789.576904296875",
    "2807.64111328125",
    "2812.990234375",
    "2884.01220703125",
    "2910.174072265625",
    "2946.427978515625",
    "3072.483154296875",
    "3201.5283203125",
    "3391.497314453125",
    "3405.562255859375",
    "3287.35107421875",
    "3225.631591796875",
    "3223.681640625",
    "3357.2802734375",
    "3667.765380859375",
    "3630.974853515625",
    "3435.65576171875",
    "3268.36376953125",
    "3152.769287109375",
    "3151.41455078125",
    "3120.899658203125",
    "3070.360595703125",
    "3042.3232421875",
    "3045.275634765625"],
  polyline:
   "}cflFxlflS{D{JsIm\\g@kMJaEjAgCOuKeBsL_AoJtAgMy@iO_CwKe@uCVsEv@gGtEsRy@wFyBgELsB
bE_DhB}GW{AmBiAoAE[gID}g@?aBy@C]?s@e@gQGuE_A{DeE{K{OkEuDiFFaCdCkDfD}ElLuI`\\{EbRuCz
GeFrFsA`EeChEqBdAaE|FuG~IiD`BoBjDgRxQmLtLcF`OuAf@qCi@_DTgBbBAnDr@bE_AtDiCnIcClK{@`K
hApHd@jFu@rF_B|BsGzE{CfHyDfEuElCmA`CuDjKcF~AuAm@mDcDgCpEuDfEmDzHwErHiClIqFpIqF|EqIh
J}K|H_D`BaHvMmJvFgFbEgBpBiDjFsIbJsMhZiBrCaD|AcJzE{FzBuElEkUjNyEhAiEtCiP~I{JxC{FdEz@
hBc@tErBLH`BmB`BqCf@}H`E{D|D{A`IeApAg@_Ci@II~Ek@fHmBrI{FhVe@hEeBnAgBxE}CdHaC|DiAxIG
jFuBdIq@jBvA`ARr@{@vBqFbEn@|@fErA~FfAzBGfFh@nG|DxBtB`CdBhClD|AfA^r@Zo@t@]O`Jg@`FPz@
l@IjC_C`CsBhBxA_AlFwBtHR~@r@{@l@m@j@h@~@fGcCbDWrB~@jBzGj@|GCpDGNz@gAnAyBxChCMbCC^^H
fBl@TmC~EhEwBUt@tAYPbBvIr@tANh@|Af@rDvFrFzFrArAw@pAoDfEkFfESlCk@xBy@vDEtCg@xLhAlED`
BdAfCM`Bp@l@YhAsAlHdCnHWvBv@vAtC`G|B|CrAdAj@|AEbC_DnD_@nEf@~A|Df@vBdAn@fBaBxByGbAcG
_@eCWsDyBuCe@}Ez@uCjAyDt@qCjAaApDwB`LkClAEh@[jARhDnD|CvDpHpBpD\\lCMpBu@~I_DxOkAjMxE
rHhFzBv@t@UpEXWmAb@s@vADbG|CxCVxDIxAmCJ_AtA[jDl@lAgAhIp@lB`@vAxAd@Xr@y@Xa@d@n@d@nGf
@j@]tBjBv@rHs@nCeBtAcCPnA{@vEA~AbCQ_@xCq@fDi@dBaCbBk@`Ab@vAlC`AnBt@`AQl@_DzAyBrDy@f
D?hDjB\\pBzBp@p@i@ZwBLkEbBoAjA\\nApCfAbFxGlDlEcAfFaEf@uEjDOnCpAxJlB`CGnBuAzCd@nEa@`
JZbDzA~@wAEwBhA{@dDvCfCt@zCAfB_GO_FcFA}FcBNaCnAeBxDcIvBeD~AO`@{Ao@qDWoCFeBgAoA}DMsH
mAsJaEsC?{LcBoGcAgEjBaDd@mAgBYV"
})

ride_10 = Ride.create!({
  date_time: DateTime.now,
  title: "Big Ride to the Lake",
  description: "Went for a dip!",
  athlete_id: User.all[2].id,
  distance: 116.2,
  elevation: 607.1,
  duration: 615,
  gps_points:
   ["43.7012023925781",
    "426.6153564453125",
    "442.2934265136719",
    "457.9852600097656",
    "401.8168029785156",
    "381.853759765625",
    "439.6608276367188",
    "241.8058166503906",
    "188.1307525634766",
    "164.6146392822266",
    "155.5675354003906",
    "149.0172271728516",
    "153.6550750732422",
    "154.9443206787109",
    "132.2606506347656",
    "125.8712921142578",
    "135.0975189208984",
    "153.2072906494141",
    "145.9977264404297",
    "118.8062896728516",
    "145.0334320068359",
    "135.8426055908203",
    "145.8754577636719",
    "163.4987945556641",
    "160.2803955078125",
    "191.1881408691406",
    "198.3700103759766",
    "225.4482879638672",
    "287.1018371582031",
    "263.3067016601562",
    "234.0000305175781",
    "220.0143585205078",
    "208.9353179931641",
    "198.4005737304688",
    "182.3108825683594",
    "153.8056335449219",
    "136.0560150146484",
    "136.8390197753906",
    "110.7789154052734"],
  polyline:
   "gz`vFfbarMmC~PwLfIgHqC_IcIdA_JrBaJtDcF@uHgDaGyK}UeNw_@sJ_^gIid@uNabAkFci@eHs`@Q
mOzAeHqBaCrAmCh@}H?kWmB}Aa@wHk@_VsAcWYo]`Ec\\iByU|AkO`CuEAmJnAcMv@kN]m`@Cs\\gC}[wOm
_AyEyJwB{L}Gy\\cIib@}AmLmKgg@eEyh@{DaB}BwHq@uR_Gi\\_Ewm@`AeJpCmCaDaDu@}Go@yO_@}[E_T
iByBmDdA}DuW~Bc\\tAqZlBks@rMgZle@oFve@aCl^G~QsLlOae@xAyNbAyJ~AfLpBrO|DrXdD`C~QoEnNq
DvF~Y|FzJlO{DpDi@j@vEnBfQx@nPrAfPpPjlAg@lE_@xBnDm@rC{@tIeCbEqDAaC]k[i@}AcAt@x@tb@qB
KpBJy@ub@bAu@h@|A\\j[@`C|EH|HaC~V}Hbe@wEtBnFs@xOcBrW~DzVtUveAjJ|h@tHrr@jHdVvUjl@dFl
Tr@~WxMjg@~DdMrFoAmDz@aBfJzIrmAjQtaArF~u@xN|{@bIxX`R~WjJrU`Cn]ZnEpB_@tBkBuBjBmBtDfO
hm@dG~sAfDjiA|@vk@pMndAnIxZvIk@bVoEfF`FbPlX`EpCzLdAfB_@hAwSiAvSgB^{JmA_AFoBjBcAxIsF
bWeQnGoGzBlBjNvDrSlAhMAf\\Cbp@oKdpAoFdr@|Fz^bSzm@dPvd@pBfHiBjEaIrIeBbHzCxJzFpRbUrv@
iFzMgDvKwDQkMuBpEnY`DvNeF`^KdNnHfYuCjHsGfE{E~CCfLjEbST~He@jPcGtOzAvUfAnb@`Gjb@P|Xt@
tQ`N`o@tJ~u@bMpt@xDzc@uCp`@wHbQmS|CwP`[iE|CgEeEqQqNcMsCsNVuLmZiGwJ}EuOuMgc@gUeo@uMy
RoCmKnB_NgBiRkFqJkW}YaNwdAgFyYkHd@uGoCwAmKqDeFwFsJqCkTuFwRgRsH_SjHFjHoCtA}BcF]wHqK_
SuT}g@wRq[eH{I_KiFgMpD_IzIyNqH?rJcElA{UqTuYoRyD}@eCjB{ClDUtEqB|LZ`HmDdF|R|`@nY`{@`u
ApfD~l@vnAdc@`jAjh@zeBtDzK~Dxe@|Ev\\zc@rvAfV~|@hb@r}AhNz_A`QdgApUrsBfSlx@nGlm@dBfMu
BrPxGtZvL`g@xR`_BtM|q@bUhn@vWjaAv@rQnEnXzEOjFyAjAlHlEfVxQ`p@x@vg@lL`c@vFnKzAbFyEzBm
FfCwBpCCrYnE|UlAhJnAdGbDbEpF~F|DbJdGzQ^zG"
})

# ride_1 = Ride.create!({
#   date_time: "2022-02-02 017:02:36 UTC",
#   title: "Big loop in Annadel Park",
#   description: "Legs were a bit tired, so took it easy. Autumn colors starting to come out.",
#   athlete_id: User.all[1].id,
#   distance: 25.4,
#   duration: 6231,
#   elevation: 587,
#   # GPXFile: "./assets/gpx/annadel24334.gpx"
# })
# ride_1.photos.attach([
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210525_190321.jpg'), filename: 'ride_pic'},
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/1623156396310.jpg'), filename: 'ride_pic'},
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/1627389574997-29.jpg'), filename: 'ride_pic'}
# ])

# ride_2 = Ride.create!({
#   date_time: "2022-03-13 015:12:36 UTC",
#   title: "Recovery ride with Justin",
#   description: "Easy spin after a tough race weekend.",
#   athlete_id: User.all[2].id,
#   distance: 13.6,
#   duration: 2956,
#   elevation: 287,
#   # GPXFile: "./assets/gpx/recovery42343.gpx"
# })
# ride_2.photos.attach([
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210716_175550.jpg'), filename: 'ride_pic'},
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/20210717_201312.jpg'), filename: 'ride_pic'}
# ])

# ride_3 = Ride.create!({
#   date_time: "2022-05-21 012:48:01 UTC",
#   title: "To the peak of Jack London",
#   description: "Big climb and epic descent.",
#   athlete_id: User.all[0].id,
#   distance: 39.0,
#   duration: 4000,
#   elevation: 1201,
#   # GPXFile: "./assets/gpx/jlondon42334.gpx"
# })

# ride_4 = Ride.create!({
#   date_time: "2022-11-5 012:19:01 UTC",
#   title: "Cruising through the hills",
#   description: "Toughest ride I've done in a while. I didn't bring enough food, so i Bonked super hard. I'll prepare better next time.",
#   athlete_id: User.all[4].id,
#   distance: 99.6,
#   duration: 3500,
#   elevation: 1946,
#   # GPXFile: "./assets/gpx/jlondon42334.gpx"
# })
# ride_4.photos.attach([
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/PXL_20220924_191312598.jpg'), filename: 'ride_pic'},
#   {io: URI.open('https://bravostravaclone-seeds.s3.us-west-1.amazonaws.com/seed_photos/PXL_20220924_184256270.jpg'), filename: 'ride_pic'}
# ])

# Create kudos
puts "Creating kudos..."

Kudo.create!({
  giver_id: User.all[3].id,
  ride_id: ride_10.id
})

Kudo.create!({
  giver_id: demo_user.id,
  ride_id: ride_10.id
})

Kudo.create!({
  giver_id: User.all[2].id,
  ride_id: ride_9.id
})

Kudo.create!({
  giver_id: User.all[2].id,
  ride_id: ride_9.id
})

# Create comments
puts "creating comments..."

Comment.create!({
  commenter_id: User.all[0].id,
  ride_id: ride_10.id,
  body: 'How often do you shave your legs?'
})

Comment.create!({
  commenter_id: User.all[2].id,
  ride_id: ride_9.id,
  body: 'Is this your favorite course?'
})

Comment.create!({
  commenter_id: User.all[5].id,
  ride_id: ride_8.id,
  body: 'Can you bring me next time?'
})
Comment.create!({
  commenter_id: User.all[0].id,
  ride_id: ride_7.id,
  body: 'Did you steal my bike? It looks just like mine that got taken last week!'
})
Comment.create!({
  commenter_id: User.all[2].id,
  ride_id: ride_10.id,
  body: 'Please call me before you go on this ride again! Awesome!'
})
Comment.create!({
  commenter_id: User.all[3].id,
  ride_id: ride_9.id,
  body: 'You taking PEDs? So fast!'
})


puts "Done!"

