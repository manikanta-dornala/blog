---
layout: post
title: "Ubiquitous Technologies for Healthcare and Wellbeing"
date: 2019-01-14
excerpt: '
    There are two kinds of systems in use in Healthcare with different environmental setting and anticipation but with the same purpose of patient care, point-of-care situations and patient-centric sensing. We will discuss and reflect upon how computing is aiding both in different ways for various different outcomes. 
'
comments: true
mathjax: true
tags: Ubicomp Healthcare
---

<!-- <h2>Introduction</h2> -->

Traditional healthcare involves point-of-care situations where a physician is physically involved. But with
improvements in pervasive sensing capabilities, we can achieve a sense of ubiquitous care for ourwellbeing. Use of new
technology in healthcare is nothing new. Advancements have eventually found their way into healthcare. Discovery of
X-Rays was not foreseen to be used for seeing through the muscle to look for broken bones and today Social Media
intended for entertainment and sharing is a prime candidate for an unobtrusive technology to trace human wellbeing.

There are two kinds of systems in use with different environmental setting and anticipation but with the same purpose
of patient care, point-of-care situations and patient-centric sensing. We will discuss and reflect upon how computing
is aiding both in different ways for various different outcomes.

Point of care situations involve medical personnel, information systems, appliances, drug administration,
etc.(emergency systems, core tools like ultrasound devices, MRIs, Lab instruments etc) They can be interconnected to
build smart environments in hospitals to enable physicians with better tools to perform the diagnosis, prescription and
further followup. Currently, all of these systems do not disappear and obtrusively enter a patient's personal space.

There is a need for patient-centric sensing for extended care beyond hospitals. These sensors need to create a setting
as natural as possible. They have to disappear from our daily lives. By disappear I do not mean for them to be gone but
to be seamlessly integrated. We have our smartphones, we have our smartwatches and we are making smart clothing with
computational abilities. This enables pervasive sensing of individual health and wellbeing with potential actuation.

<h2>Point of Care Situations</h2>

We can further divide the active mode of care into instances of incident response and Hospitalized treatment.

<h3>Emergency Response Management</h3>

Improvements in real-time location and communication services have greatly boosted the response times to incident
reports. Several studies conclude that decreasing these response times is critical as a patients mortality is greatly
affected by every passing second <a href="#bib.20">[20]</a>. Smart traffic guiding systems, like <a href="#bib.40">[40]</a>,
broadcast signals so that obstructing traffic may be moved early on for faster movement of the response vehicle. They
developed a system of smart signals at road junctions to limit the flow of traffic, reduce the number of crossings for
the patient vehicle and increase the overall safety of everyone involved. However such systems do not scale well and
are costly to operate at the moment. Similarly, <a href="#bib.9">[9]</a> discusses a system that requires every vehicle
to host a GPS unit, which is slowly becoming a reality. Thus traffic can be monitored real-time for better guidance.
Another way to achieve this is to reroute the ambulance for faster transport with warning systems <a href="#bib.26">[26]</a>.
Today we can partially do this via active community support through apps like Waze, Google Maps that enable other
drivers to make conscious decisions regarding these incidents <a href="#bib.1">[1]</a>. Full-scale systems are yet to
be everywhere and we need further improvements in achieving our visions of smart cities with ubiquitous technologies.

The second thing to consider is pre-hospital care. The paramedics can assist the doctor through various telemedicine
systems proposed as early as 2003 by <a href="#bib.11">[11]</a> using 3G and <a href="#bib.31">[31]</a> with GSM
services. This allows the doctors to asses the situation preemptively and reduce their decision time to treat the
patient. Many in-situ devices where improved to work in mobile situations making the telediagnosis much more reliable
and faster like ultrasound devices <a href="#bib.37">[37]</a>, portable ECGs <a href="#bib.39">[39]</a>. They relay
information requiring real-time monitoring by the doctor in the hospital, hence there is great necessity to reduce
transmission delay <a href="#bib.2">[2]</a>. Today Wearables are also being built for paramedics <a href="#bib.3">[3]</a>
to aid in disaster response.

Recently <a href="#bib.38">[38]</a> proposed a ubiquitous system encompassing both based on their previous study <a
    href="#bib.8">[8]</a>. It is an integration of the telemedicine systems with teleguidance systems to make the
Emergency Response Management faster and safer.

<h3>In Hospital Care</h3>

The major focus is patient welfare which primarily is achieved by best assisting the physician in care. Hence the need
for a \textitdoctor-centric design process that is minimally invasive for the patient. We are here concerned about the
intelligent network of devices rather than medical appliances themselves, whose advancement is a different leap.

Work in building Smart Hospital environments is currently in progress with various solutions based on Activity
Recognition<a href="#bib.35">[35]</a>, RFID based identification<a href="#bib.19">[19]</a> and IoT based architectures
<a href="#bib.42">[42]</a>. They envision a network of sensors and smart actuators that can monitor patient vitals,
device availability, drug administration <a href="#bib.25">[25]</a>, etc, thereby enabling the physician to give the
best possible care.

Context-aware systems are a very essential part of the in-situ care environment. The idea of such systems is from
decades ago during the mainframe era<a href="#bib.4">[4]</a>. Humans in such cases can cause errors that lead to deaths
even when the rescue was possible <a href="#bib.0">[0]</a>. Hence smart systems are necessary to mitigate the risk.
Paging devices of the old days for an immediate response to today's devices like PDAs and tablets as sources of patient
information and delivery of reports are a move towards integration. Today hospital management systems are moving to
cloud for reliable data delivery and centralized patient care management.

<h2>Pervasive Sensing</h2>

Once a patient is out of the hospital system it is not possible for a physician to actively monitor constantly, except
for regular visits. Here the active management is being transferred from the doctor to the patient. However, we do not
want it to be invasive for the patient. Hence the need for unobtrusive and pervasive sensing technologies for the
doctor(or the patient) to passively monitor. It was nearly a decade ago in 2008 when <a href="#bib.6">[6]</a> put forth
the vision of People-Centric Sensing that made the users a key architectural component for opportunistic sensing in
personal and virtual spaces.

<h3>On Person</h3>

Nearly everyone carries a smartphone that has true ubiquitous potential for understanding patient behaviour <a href="#bib.32">[32]</a>
and two-way communication with the doctor <a href="#bib.28">[28]</a>. For example; monitoring student wellbeing and
performance on campuses <a href="#bib.41">[41]</a>.

Blood pressure monitoring devices went from mercury-based Sphygmomanometers to handheld electronic modules to now
wearable watches. These wearables are capable of measuring a plethora of physiological signals from the body and can
generate detailed profiles. The accuracy and usability are debatable but the potential for them is vast. The idea of
Health monitoring via wearables was envisioned early on <a href="#bib.29">[29]</a>, but we are yet to see their mass
acceptance.

Today the market seems to be mostly focused on fitness enthusiasts who actively track their own wellbeing and seek
assistance in case of need. In some case it even helps to set goals; like take 10000 steps a day <a href="#bib.22">[22]</a>
or have a score based assessment <a href="#bib.24">[24]</a>, etc. Athletes wear smart <a href="#bib.16">[16]</a>
clothing with sensors that can help them monitor their performance <a href="#bib.10">[10]</a>, prevent injuries and
actively seek help.

<h3>At Home</h3>

In-home sensing involves devices that no longer require medical personnel and can be used by the patients directly.
Smart Homes are not a new concept (<a href="#bib.23">[23]</a>) but most of the work for in-home health care currently
seems to focus on assisting the elderly or propose systems for telemedicine.

We can imagine a system of sensors that can help people to make decisions for their own care. Smart fridges <a href="#bib.27">[27]</a>
that help us in stocking better. Image Recognition technologies that aid in healthy cook. Intelligent mirrors capable
of assessing physiological and emotional signs. Home beacons <a href="#bib.17">[17]</a> that can analyze patterns to
set the mood for better mental wellbeing. A virtual assistant to help with loneliness. Homes that exchange information,
that can also potentially alert neighbors for immediate response before emergency services arrive.

Accurate and timely dosage is important for a healthy recovery. Today we are seeing a host of applications that
integrate with voice assistants like Alexa, Google Home to help patients to never miss a dose <a href="#bib.15">[15]</a>
and with small devices like Automated Insulin Pumps. These assistants also can help elderly people control their home
appliances like Temperature control, lighting, etc.

There is a lot of work that needs to be done in this field. A clear direction is yet to be envisioned which is hard
because we do not yet understand what a smart home can really achieve.

<h3>Digital Life</h3>

A person's digital footprint is growing by the day and there seems to be no going back. Social Media posts are very
much in a natural setting without intrusion from study elements. There is an emotional aspect in such self disclosures
that have markers to study psychological changes in a user's behavior. Predicting depression<a href="#bib.14">[14]</a>,
Monitoring postpartum behavior changes in women after childbirth <a href="#bib.13">[13]</a> or PTSD via twitter <a href="#bib.21">[21]</a>
are examples of such use.

Most of the implications are psychological in nature but mental health is an important part of personal well being.
Social Media is truly ubiquitous as it is always on and \textiteverywhere. We already have ads targeted towards us
based on our behavior in digital space, it is not hard to imagine a link between digital behaviors and smart homes that
can potentially trace your mood and make an ambient setting at home which will help in continuously enhancing a person
mental health. There are huge privacy implications to this and a structure needs to be defined in discussing the ethics
of such systems, but I'm hopeful.

It also has implications in pathological bio-surveillance! It can help assess the outbreak of diseases like cholera <a
    href="#bib.12">[12]</a> by complementing physiological data.

Social Media is a unique sensing opportunity into a person's mind and needs to be handled with care. A lot of thought
needs to be put in designing actuation based on this sensor. Chatbots that were intended to help by analyzing crowd
behaviors can go wrong, (Ex: Tay Chat Bot <a href="#bib.18">[18]</a>), because of human unpredictability.

<h2>Discussion</h2>

Most of the applications today involve either new developments or proof of concepts for emerging technologies. It is no
longer about automation of legacy systems in a move away from paper. However, it has a long way to go from testing
these technologies to true ubiquitous and systemic embedding into the entire healthcare pipeline. All of this needs to
be done without bringing in additional pressure into the already strained wellness programs.

The architects of such systems need some critical questions answered about the ownership of all the data being
generated and associated moral conundrums <a href="#bib.34">[34]</a>. Consider these simple situations; A monitoring
device reveals a lot about the person.


<ul>

    <li>
        <p>Maybe they are involved in illicit behaviors. What are the implications of such detection?</p>
    </li>

    <li>
        <p>Should a person pretend to be nicer when being monitored by these pervasive devices? Is it still a natural
            setting?</p>
    </li>

    <li>
        <p>What if someone deliberately generates false readings? Is this person refusing medical care without explicit
            mention?</p>
    </li>
</ul>

Can ubiquitous technologies be only part of an Orwellian Dystopia? The complexities are endless as with any system but
that should not discourage us in looking forward to full penetration.

<h2>Conclusion</h2>

It is clear that the state of Ubiquitous Technologies in the context of healthcare does not live up to its namesake
yet. As new technologies emerge and proof of concepts become realities, to utilize their potential policymakers need to
work with the developers to address challenges both current and future while keeping in mind the opportunities and
benefits they bring.



<h2>References</h2>

<ol start="0">

    <li id="bib.0" value="0">

        Medical errors kill tens of thousands annually, panel, 1999.


    </li>
    <li id="bib.1" value="1">
        How waze crowdsourcing navigation app can help emergency services, May 2018.


    </li>
    <li id="bib.2" value="2">
        A.&nbsp;Alesanco and J.&nbsp;Garc'ia.
        Clinical assessment of wireless ECG transmission in real-time
        cardiac telemonitoring.
        <i>IEEE Transactions on Information Technology in Biomedicine</i>,
        14(5):1144--1152, 2010.


    </li>
    <li id="bib.3" value="3">
        S.&nbsp;A. Alharthi, H.&nbsp;N. Sharma, S.&nbsp;Sunka, I.&nbsp;Dolgov, and Z.&nbsp;O. Toups.
        Designing future disaster response team wearables from a grounding in
        practice.
        <i>Proceedings of Technology, Mind, and Society, TechMindSociety</i>,
        18, 2018.


    </li>
    <li id="bib.4" value="4">
        C.&nbsp;R. Brigham and M.&nbsp;Kamp.
        The current status of computer-assisted instruction in the health
        sciences.
        <i>Academic Medicine</i>, 49(3):278--9, 1974.


    </li>
    <li id="bib.5" value="5">
        A.&nbsp;Buchenscheit, F.&nbsp;Schaub, F.&nbsp;Kargl, and M.&nbsp;Weber.
        A VANET-based emergency vehicle warning system.
        In <i>Vehicular Networking Conference (VNC), 2009 IEEE</i>, pages
        1--8. IEEE, 2009.


    </li>
    <li id="bib.6" value="6">
        A.&nbsp;T. Campbell, S.&nbsp;B. Eisenman, N.&nbsp;D. Lane, E.&nbsp;Miluzzo, R.&nbsp;A. Peterson, H.&nbsp;Lu,
        X.&nbsp;Zheng, M.&nbsp;Musolesi, K.&nbsp;Fodor, and G.-S. Ahn.
        The rise of people-centric sensing.
        <i>IEEE Internet Computing</i>, 12(4), 2008.


    </li>
    <li id="bib.7" value="7">
        L.&nbsp;Catarinucci, D.&nbsp;De&nbsp;Donno, L.&nbsp;Mainetti, L.&nbsp;Palano, L.&nbsp;Patrono, M.&nbsp;L.
        Stefanizzi, and L.&nbsp;Tarricone.
        An IoT-aware architecture for smart healthcare systems.
        <i>IEEE Internet of Things Journal</i>, 2(6):515--526, 2015.


    </li>
    <li id="bib.8" value="8">
        C.-S. Chang, T.-H. Tan, Y.-F. Chen, Y.-F. Huang, M.-H. Lee, J.-C. Hsu, and
        H.-C. Chen.
        Development of a ubiquitous emergency medical service system based on
        zigbee and 3.5 g wireless communication technologies.
        In <i>International Conference on Medical Biometrics</i>, pages
        201--208. Springer, 2010.


    </li>
    <li id="bib.9" value='9'>
        C.-Y. Chen, P.-Y. Chen, and W.-T. Chen.
        A novel emergency vehicle dispatching system.
        In <i>VTC Spring</i>, pages 1--5. Citeseer, 2013.


    </li>
    <li id="bib.10" value='10'>
        M.&nbsp;Chen, Y.&nbsp;Ma, J.&nbsp;Song, C.-F. Lai, and B.&nbsp;Hu.
        Smart clothing: Connecting human with clouds and big data for
        sustainable health monitoring.
        <i>Mobile Networks and Applications</i>, 21(5):825--845, 2016.


    </li>
    <li id="bib.11" value='11'>
        Y.&nbsp;Chu and A.&nbsp;Ganz.
        A mobile teletrauma system using 3G networks.
        <i>IEEE Transactions on information Technology in Biomedicine</i>,
        8(4):456--462, 2004.


    </li>
    <li id="bib.12" value='12'>
        R.&nbsp;Chunara, J.&nbsp;R. Andrews, and J.&nbsp;S. Brownstein.
        Social and news media enable estimation of epidemiological patterns
        early in the 2010 Haitian cholera outbreak.
        <i>The American journal of tropical medicine and hygiene</i>,
        86(1):39--45, 2012.


    </li>
    <li id="bib.13" value='13'>
        M.&nbsp;De&nbsp;Choudhury, S.&nbsp;Counts, and E.&nbsp;Horvitz.
        Predicting postpartum changes in emotion and behavior via social
        media.
        In <i>Proceedings of the SIGCHI Conference on Human Factors in
            Computing Systems</i>, pages 3267--3276. ACM, 2013.


    </li>
    <li id="bib.14" value='14'>
        M.&nbsp;De&nbsp;Choudhury, M.&nbsp;Gamon, S.&nbsp;Counts, and E.&nbsp;Horvitz.
        Predicting depression via social media.
        <i>ICWSM</i>, 13:1--10, 2013.


    </li>
    <li id="bib.15" value='15'>
        A.&nbsp;Dittmar, F.&nbsp;Axisa, G.&nbsp;Delhomme, and C.&nbsp;Gehin.
        New concepts and technologies in home care and ambulatory monitoring.
        <i>Stud Health Technol Inform</i>, 108:9--35, 2004.


    </li>
    <li id="bib.16" value='16'>
        P.&nbsp;D"uking, A.&nbsp;Hotho, H.-C. Holmberg, F.&nbsp;K. Fuss, and B.&nbsp;Sperlich.
        Comparison of non-invasive individual monitoring of the training and
        health of athletes with commercially available wearable technologies.
        <i>Frontiers in physiology</i>, 7:71, 2016.


    </li>
    <li id="bib.17" value='17'>
        J.&nbsp;Fingas.
        Mood-enhancing auri light packs alexa smart home control, Nov. 2018.


    </li>
    <li id="bib.18" value='18'>
        A.&nbsp;F\olstad and P.&nbsp;B. Brandtz\aeg.
        Chatbots and the new world of HCI.
        <i>interactions</i>, 24(4):38--42, 2017.


    </li>
    <li id="bib.19" value='19'>
        P.&nbsp;Fuhrer and D.&nbsp;Guinard.
        <i>Building a smart hospital using RFID technologies: Use cases
            and implementation</i>.
        Department of Informatics-University of Fribourg Fribourg,
        Switzerland, 2006.


    </li>
    <li id="bib.20" value='20'>
        R.&nbsp;P. Gonzalez, G.&nbsp;R. Cummings, H.&nbsp;A. Phelan, M.&nbsp;S. Mulekar, and C.&nbsp;B. Rodning.
        Does increased emergency medical services prehospital time affect
        patient mortality in rural motor vehicle crashes? a statewide analysis.
        <i>The American Journal of Surgery</i>, 197(1):30--34, 2009.


    </li>
    <li id="bib.21" value='21'>
        G.&nbsp;Harman and M.&nbsp;H. Dredze.
        Measuring post traumatic stress disorder in twitter.
        <i>In ICWSM</i>, 2014.


    </li>
    <li id="bib.22" value='22'>
        A.&nbsp;Ilhan and M.&nbsp;Henkel.
        10,000 steps a day for health? user-based evaluation of wearable
        activity trackers.
        2018.


    </li>
    <li id="bib.23" value='23'>
        C.&nbsp;D. Kidd, R.&nbsp;Orr, G.&nbsp;D. Abowd, C.&nbsp;G. Atkeson, I.&nbsp;A. Essa, B.&nbsp;MacIntyre,
        E.&nbsp;Mynatt, T.&nbsp;E. Starner, and W.&nbsp;Newstetter.
        The aware home: A living laboratory for ubiquitous computing
        research.
        In <i>International Workshop on Cooperative Buildings</i>, pages
        191--198. Springer, 1999.


    </li>
    <li id="bib.24" value='24'>
        M.&nbsp;Kranz, A.&nbsp;M"oLler, N.&nbsp;Hammerla, S.&nbsp;Diewald, T.&nbsp;Pl"oTz, P.&nbsp;Olivier, and
        L.&nbsp;Roalter.
        The mobile fitness coach: Towards individualized skill assessment
        using personalized mobile devices.
        <i>Pervasive and Mobile Computing</i>, 9(2):203--215, 2013.


    </li>
    <li id="bib.25" value='25'>
        G.&nbsp;Y. Larsen, H.&nbsp;B. Parker, J.&nbsp;Cash, M.&nbsp;O'Connell, and M.&nbsp;C. Grant.
        Standard drug concentrations and smart-pump technology reduce
        continuous-medication-infusion errors in pediatric patients.
        <i>Pediatrics</i>, 116(1):e21--e25, 2005.


    </li>
    <li id="bib.26" value='26'>
        C.&nbsp;S. Lim, R.&nbsp;Mamat, and T.&nbsp;Braunl.
        Impact of ambulance dispatch policies on performance of emergency
        medical services.
        <i>IEEE Transactions on Intelligent Transportation Systems</i>,
        12(2):624--632, 2011.


    </li>
    <li id="bib.27" value='27'>
        S.&nbsp;Luo, H.&nbsp;Xia, Y.&nbsp;Gao, J.&nbsp;S. Jin, and R.&nbsp;Athauda.
        Smart fridges with multimedia capability for better nutrition and
        health.
        In <i>Ubiquitous Multimedia Computing, 2008. UMC'08. International
            Symposium on</i>, pages 39--44. IEEE, 2008.


    </li>
    <li id="bib.28" value='28'>
        D.&nbsp;D. Luxton, R.&nbsp;A. McCann, N.&nbsp;E. Bush, M.&nbsp;C. Mishkind, and G.&nbsp;M. Reger.
        mHealth for mental health: Integrating smartphone technology in
        behavioral healthcare.
        <i>Professional Psychology: Research and Practice</i>, 42(6):505,
        2011.


    </li>
    <li id="bib.29" value='29'>
        A.&nbsp;Lymberis.
        Smart wearables for remote health monitoring, from prevention to
        rehabilitation: Current R\&D, future challenges.
        In <i>Information Technology Applications in Biomedicine, 2003. 4th
            International IEEE EMBS Special Topic Conference on</i>, pages 272--275. IEEE,
        2003.


    </li>
    <li id="bib.30" value='30'>
        M.&nbsp;M. Maack.
        How google's waze crowdsourced traffic data to save lives across
        Europe, Apr. 2018.


    </li>
    <li id="bib.31" value='31'>
        G.&nbsp;Mandellos, D.&nbsp;Lymperopoulos, M.&nbsp;Koukias, A.&nbsp;Tzes, N.&nbsp;Lazarou, and
        C.&nbsp;Vagianos.
        A novel mobile telemedicine system for ambulance transport. design
        and evaluation.
        In <i>Engineering in Medicine and Biology Society, 2004. IEMBS'04.
            26th Annual International Conference of the IEEE</i>, volume&nbsp;2, pages
        3080--3083. IEEE, 2004.


    </li>
    <li id="bib.32" value='32'>
        M.&nbsp;Milo\vsevi'c, M.&nbsp;T. Shrove, and E.&nbsp;Jovanov.
        Applications of smartphones for ubiquitous health monitoring and
        wellbeing management.
        <i>JITA-JOURNAL OF INFORMATION TECHNOLOGY and APLICATIONS</i>, 1(1),
        2011.


    </li>
    <li id="bib.33" value='33'>
        P.&nbsp;T. Pons and V.&nbsp;J. Markovchick.
        Eight minutes or less: Does the ambulance response time guideline
        impact trauma patient outcome? 1.
        <i>The Journal of emergency medicine</i>, 23(1):43--48, 2002.


    </li>
    <li id="bib.34" value='34'>
        M.&nbsp;Rigby.
        Applying emergent ubiquitous technologies in health: The need to
        respond to new challenges of opportunity, expectation, and responsibility.
        <i>International journal of medical informatics</i>, 76:S349--S352,
        2007.


    </li>
    <li id="bib.35" value='35'>
        D.&nbsp;S'anchez, M.&nbsp;Tentori, and J.&nbsp;Favela.
        Activity recognition for the smart hospital.
        <i>IEEE intelligent systems</i>, 23(2), 2008.


    </li>
    <li id="bib.36" value='36'>
        R.&nbsp;S'anchez-Mangas, A.&nbsp;Garc'ia-Ferrrer, A.&nbsp;De&nbsp;Juan, and A.&nbsp;M. Arroyo.
        The probability of death in road traffic accidents. how important is
        a quick medical response?
        <i>Accident Analysis \& Prevention</i>, 42(4):1048--1056, 2010.


    </li>
    <li id="bib.37" value='37'>
        M.-J. Su, H.-M. Ma, C.-I. Ko, W.-C. Chiang, C.-W. Yang, S.-J. Chen, R.&nbsp;Chen,
        and H.-S. Chen.
        Application of tele-ultrasound in medical emergency services.
        In <i>e-health Networking, Applications and Services, 2008.
            HealthCom 2008. 10th International Conference on</i>, pages 66--67. IEEE, 2008.


    </li>
    <li id="bib.38" value='38'>
        T.-H. Tan, M.&nbsp;Gochoo, Y.-F. Chen, J.-J. Hu, J.&nbsp;Y. Chiang, C.-S. Chang, M.-H.
        Lee, Y.-N. Hsu, and J.-C. Hsu.
        Ubiquitous emergency medical service system based on wireless
        biosensors, traffic information, and wireless communication technologies:
        Development and evaluation.
        <i>Sensors</i>, 17(1):202, 2017.


    </li>
    <li id="bib.39" value='39'>
        S.&nbsp;Thelen, M.&nbsp;Czaplik, P.&nbsp;Meisen, D.&nbsp;Schilberg, and S.&nbsp;Jeschke.
        Using off-the-shelf medical devices for biomedical signal monitoring
        in a telemedicine system for emergency medical services.
        <i>IEEE journal of biomedical and health informatics</i>,
        19(1):117--123, 2015.


    </li>
    <li id="bib.40" value='40'>
        K.&nbsp;Tokuda and S.&nbsp;Ohmori.
        Demonstration experiments of SAFER (Speedy ambulance first-aid,
        emergency, rescue operations supporting) system.
        In <i>Wireless Personal Multimedia Communications (WPMC), 2011 14th
            International Symposium on</i>, pages 1--5. IEEE, 2011.


    </li>
    <li id="bib.41" value='41'>
        R.&nbsp;Wang, F.&nbsp;Chen, Z.&nbsp;Chen, T.&nbsp;Li, G.&nbsp;Harari, S.&nbsp;Tignor, X.&nbsp;Zhou,
        D.&nbsp;Ben-Zeev,
        and A.&nbsp;T. Campbell.
        StudentLife: Assessing mental health, academic performance and
        behavioral trends of college students using smartphones.
        In <i>Proceedings of the 2014 ACM international joint conference on
            pervasive and ubiquitous computing</i>, pages 3--14. ACM, 2014.


    </li>
    <li id="bib.42" value='42'>
        L.&nbsp;Yu, Y.&nbsp;Lu, and X.&nbsp;Zhu.
        Smart hospital based on internet of things.
        <i>Journal of Networks</i>, 7(10):1654, 2012.

    </li>
</ol>