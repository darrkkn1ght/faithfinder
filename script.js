class FaithFinder {
    constructor() {
        this.currentTheme = 'light';
        // API Configuration
        this.bibleApiConfig = {
            // Option 1: Bible-API (Free, no key needed)
            bibleApi: {
                url: 'https://bible-api.com/?random=verse',
                backup: 'https://bible-api.com/john+3:16'
            },
            // Option 2: Bible Gateway Verse of the Day
            bibleGateway: {
                url: 'https://www.biblegateway.com/votd/get/?format=json&version=NIV'
            },
            // Option 3: Multiple random verses pool
            randomVerses: [
                'john+3:16', 'psalm+23:1', 'romans+8:28', 'philippians+4:13',
                'jeremiah+29:11', 'matthew+11:28', 'isaiah+40:31', 'romans+5:8',
                'psalm+46:1', 'john+14:27', 'proverbs+3:5-6', '1peter+5:7'
            ]
        };
        this.verses = {
            anxiety: [
                {
                    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
                    reference: "Philippians 4:6-7 (NIV)",
                    context: "Paul wrote this letter while imprisoned in Rome, yet he encouraged the Philippians to find peace through prayer rather than worry. This passage teaches that God's peace surpasses human understanding and can guard our hearts and minds."
                },
                {
                    text: "Cast all your anxiety on him because he cares for you.",
                    reference: "1 Peter 5:7 (NIV)",
                    context: "Peter wrote this to Christians facing persecution, reminding them that God genuinely cares about their struggles and wants them to bring their worries to Him rather than carrying them alone."
                },
                {
                    text: "Therefore do not worry about tomorrow, for tomorrow will worry about itself. Each day has enough trouble of its own.",
                    reference: "Matthew 6:34 (NIV)",
                    context: "Jesus taught this during the Sermon on the Mount, encouraging His followers to trust God's provision and live one day at a time rather than being consumed by future concerns."
                },
                {
                    text: "When anxiety was great within me, your consolation brought me joy.",
                    reference: "Psalm 94:19 (NIV)",
                    context: "The psalmist acknowledges the reality of overwhelming anxiety while testifying to God's ability to bring comfort and joy even in the midst of inner turmoil."
                },
                {
                    text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.",
                    reference: "Deuteronomy 31:6 (NIV)",
                    context: "Moses spoke these words to the Israelites before his death, preparing them for the challenges ahead and reminding them of God's constant presence and faithfulness."
                },
                {
                    text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
                    reference: "Isaiah 41:10 (NIV)",
                    context: "God spoke through Isaiah to comfort the Israelites during their exile, promising His presence and strength. This verse assures us that God actively supports us through His power and righteousness."
                },
                {
                    text: "The Lord himself goes before you and will be with you; he will never leave you nor forsake you. Do not be afraid; do not be discouraged.",
                    reference: "Deuteronomy 31:8 (NIV)",
                    context: "Moses reassured Joshua as he prepared to lead Israel into the Promised Land, emphasizing that God goes ahead of us to prepare the way and remains with us through every challenge."
                },
                {
                    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
                    reference: "Proverbs 3:5-6 (NIV)",
                    context: "This wisdom from Solomon teaches us to rely on God's wisdom rather than our limited human perspective, trusting that He will guide us on the right path when we surrender our ways to Him."
                },
                {
                    text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
                    reference: "John 16:33 (NIV)",
                    context: "Jesus spoke these words to His disciples before His crucifixion, preparing them for the difficulties they would face while assuring them that His victory provides lasting peace and hope."
                },
                {
                    text: "God is our refuge and strength, an ever-present help in trouble.",
                    reference: "Psalm 46:1 (NIV)",
                    context: "This psalm celebrates God as our safe haven and source of strength, emphasizing that He is not distant but actively present and available to help us in times of difficulty."
                }
            ],
            depression: [
                {
                    text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
                    reference: "Psalm 34:18 (NIV)",
                    context: "This psalm was written by David after he escaped from danger. He reminds us that God doesn't abandon us in our darkest moments but draws especially close to comfort those who are hurting."
                },
                {
                    text: "He heals the brokenhearted and binds up their wounds.",
                    reference: "Psalm 147:3 (NIV)",
                    context: "This psalm celebrates God's power and compassion. Just as a loving parent tends to a child's physical wounds, God tenderly cares for our emotional and spiritual wounds."
                },
                {
                    text: "Weeping may stay for the night, but rejoicing comes in the morning.",
                    reference: "Psalm 30:5 (NIV)",
                    context: "David wrote this psalm after God delivered him from trouble, acknowledging that while sorrow is real and sometimes prolonged, it is not permanent—joy will return."
                },
                {
                    text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
                    reference: "Zephaniah 3:17 (NIV)",
                    context: "The prophet Zephaniah spoke of God's restored relationship with His people, revealing that God not only loves us but actually delights in us and rejoices over us like a parent celebrating their child."
                },
                {
                    text: "Come to me, all you who are weary and burdened, and I will give you rest.",
                    reference: "Matthew 11:28 (NIV)",
                    context: "Jesus extended this invitation to people overwhelmed by religious burdens and life's difficulties, offering genuine rest and relief for tired souls."
                },
                {
                    text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.",
                    reference: "Psalm 42:11 (NIV)",
                    context: "The psalmist honestly acknowledges his depression while deliberately choosing to redirect his focus toward God's faithfulness, demonstrating how to speak truth to our troubled hearts."
                },
                {
                    text: "He lifted me out of the slimy pit, out of the mud and mire; he set my feet on a rock and gave me a firm place to stand.",
                    reference: "Psalm 40:2 (NIV)",
                    context: "David describes God's deliverance using vivid imagery of being pulled from a treacherous pit, symbolizing how God rescues us from despair and gives us stability and hope."
                },
                {
                    text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
                    reference: "Psalm 23:4 (NIV)",
                    context: "David, drawing from his experience as a shepherd, describes how God guides and protects His people through life's most challenging and frightening moments, assuring us we're never truly alone."
                },
                {
                    text: "The Spirit of the Sovereign Lord is on me, because the Lord has anointed me to proclaim good news to the poor. He has sent me to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners.",
                    reference: "Isaiah 61:1 (NIV)",
                    context: "This messianic prophecy, which Jesus later applied to Himself, promises that God specializes in healing broken hearts and bringing freedom to those trapped in various forms of bondage."
                },
                {
                    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
                    reference: "Romans 8:28 (NIV)",
                    context: "Paul assures believers that even in suffering and difficulty, God is actively working to bring about good purposes in the lives of those who love Him."
                }
            ],
            gratitude: [
                {
                    text: "Give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
                    reference: "1 Thessalonians 5:18 (NIV)",
                    context: "Paul wrote this to the church in Thessalonica, encouraging them to maintain an attitude of gratitude even during difficult times, recognizing that thankfulness is part of God's design for our spiritual well-being."
                },
                {
                    text: "Enter his gates with thanksgiving and his courts with praise; give thanks to him and praise his name.",
                    reference: "Psalm 100:4 (NIV)",
                    context: "This psalm of praise invites worshippers to approach God with joy and gratitude, recognizing that thanksgiving is the proper attitude when coming before our Creator."
                },
                {
                    text: "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, who does not change like shifting shadows.",
                    reference: "James 1:17 (NIV)",
                    context: "James reminds us that all the good things in our lives ultimately come from God, who is constant and unchanging in His generosity toward us."
                },
                {
                    text: "Praise the Lord, my soul; all my inmost being, praise his holy name. Praise the Lord, my soul, and forget not all his benefits.",
                    reference: "Psalm 103:1-2 (NIV)",
                    context: "David calls upon his entire being to remember and celebrate God's goodness, emphasizing the importance of intentionally recalling God's blessings in our lives."
                },
                {
                    text: "Let them give thanks to the Lord for his unfailing love and his wonderful deeds for mankind.",
                    reference: "Psalm 107:8 (NIV)",
                    context: "This psalm recounts various situations where God delivered people from trouble, repeatedly calling for thanksgiving as the appropriate response to God's faithful love."
                },
                {
                    text: "I will give thanks to you, Lord, with all my heart; I will tell of all your wonderful deeds.",
                    reference: "Psalm 9:1 (NIV)",
                    context: "David commits to wholehearted thanksgiving and public declaration of God's works, showing that gratitude should be both personal and shared with others."
                },
                {
                    text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.",
                    reference: "Philippians 4:6 (NIV)",
                    context: "Paul teaches that thanksgiving should accompany our prayers and requests, showing that gratitude for God's past faithfulness should inform our present prayers."
                },
                {
                    text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
                    reference: "Colossians 3:15 (NIV)",
                    context: "Paul connects gratitude with peace and unity in the church, showing that thankfulness helps create harmony in our relationships with both God and others."
                },
                {
                    text: "Through Jesus, therefore, let us continually offer to God a sacrifice of praise—the fruit of lips that openly profess his name.",
                    reference: "Hebrews 13:15 (NIV)",
                    context: "The writer of Hebrews encourages believers to make praise and thanksgiving a continuous practice, describing it as a spiritual sacrifice that honors God."
                },
                {
                    text: "Rejoice always, pray continually, give thanks in all circumstances; for this is God's will for you in Christ Jesus.",
                    reference: "1 Thessalonians 5:16-18 (NIV)",
                    context: "Paul provides a trinity of spiritual practices—joy, prayer, and gratitude—that should characterize the Christian life regardless of circumstances."
                }
            ],
            loneliness: [
                {
                    text: "Never will I leave you; never will I forsake you.",
                    reference: "Hebrews 13:5 (NIV)",
                    context: "The author of Hebrews quotes God's promise to Joshua, reminding Christians that just as God was faithful to His people throughout history, He promises to never abandon those who trust in Him."
                },
                {
                    text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
                    reference: "Psalm 23:4 (NIV)",
                    context: "David, drawing from his experience as a shepherd, describes how God guides and protects His people through life's most challenging and frightening moments, assuring us we're never truly alone."
                },
                {
                    text: "The Lord your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
                    reference: "Zephaniah 3:17 (NIV)",
                    context: "The prophet Zephaniah spoke of God's restored relationship with His people, revealing that God not only loves us but actually delights in us and rejoices over us like a parent celebrating their child."
                },
                {
                    text: "Where can I go from your Spirit? Where can I flee from your presence? If I go up to the heavens, you are there; if I make my bed in the realm of the dead, you are there.",
                    reference: "Psalm 139:7-8 (NIV)",
                    context: "David marvels at God's omnipresence, realizing that no matter where life takes us—whether to great heights or lowest depths—God is always there with us."
                },
                {
                    text: "A father to the fatherless, a defender of widows, is God in his holy dwelling. God sets the lonely in families, he leads out the prisoners with singing.",
                    reference: "Psalm 68:5-6 (NIV)",
                    context: "This psalm celebrates God's special care for those who are isolated or vulnerable, promising that He provides family and community for the lonely."
                },
                {
                    text: "Turn to me and be gracious to me, for I am lonely and afflicted.",
                    reference: "Psalm 25:16 (NIV)",
                    context: "David honestly expresses his loneliness to God, demonstrating that it's appropriate to bring our feelings of isolation directly to God in prayer."
                },
                {
                    text: "I will not leave you as orphans; I will come to you.",
                    reference: "John 14:18 (NIV)",
                    context: "Jesus promised His disciples that though He would physically leave them, He would not abandon them like orphans but would come to them through the Holy Spirit."
                },
                {
                    text: "Be strong and courageous. Do not be afraid or terrified because of them, for the Lord your God goes with you; he will never leave you nor forsake you.",
                    reference: "Deuteronomy 31:6 (NIV)",
                    context: "Moses spoke these words to the Israelites before his death, preparing them for the challenges ahead and reminding them of God's constant presence and faithfulness."
                },
                {
                    text: "Cast all your anxiety on him because he cares for you.",
                    reference: "1 Peter 5:7 (NIV)",
                    context: "Peter reminds believers that God genuinely cares about our struggles, including our loneliness, and wants us to bring these feelings to Him rather than carrying them alone."
                },
                {
                    text: "Two are better than one, because they have a good return for their labor: If either of them falls down, one can help the other up.",
                    reference: "Ecclesiastes 4:9-10 (NIV)",
                    context: "Solomon teaches about the value of companionship and community, while also pointing us toward seeking meaningful relationships as God's design for overcoming isolation."
                }
            ],
            fear: [
                {
                    text: "Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.",
                    reference: "Joshua 1:9 (NIV)",
                    context: "God spoke these words to Joshua as he was about to lead the Israelites into the Promised Land after Moses' death. It reminds us that courage comes from knowing God is with us in every situation."
                },
                {
                    text: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.",
                    reference: "Isaiah 41:10 (NIV)",
                    context: "God spoke through Isaiah to comfort the Israelites during their exile, promising His presence and strength. This verse assures us that God actively supports us through His power and righteousness."
                },
                {
                    text: "The Lord is my light and my salvation—whom shall I fear? The Lord is the stronghold of my life—of whom shall I be afraid?",
                    reference: "Psalm 27:1 (NIV)",
                    context: "David declares his confidence in God's protection, using imagery of light overcoming darkness and a fortress providing security to show how God dispels our fears."
                },
                {
                    text: "When I am afraid, I put my trust in you. In God, whose word I praise—in God I trust and am not afraid. What can mere mortals do to me?",
                    reference: "Psalm 56:3-4 (NIV)",
                    context: "David wrote this psalm when he was captured by the Philistines, showing how he chose to trust God even in genuinely dangerous situations, finding courage through faith."
                },
                {
                    text: "You will not fear the terror of night, nor the arrow that flies by day, nor the pestilence that stalks in the darkness, nor the plague that destroys at midday.",
                    reference: "Psalm 91:5-6 (NIV)",
                    context: "This psalm of protection promises God's care through various dangers, both seen and unseen, day and night, reminding us that God's protection is comprehensive and constant."
                },
                {
                    text: "There is no fear in love. But perfect love drives out fear, because fear has to do with punishment. The one who fears is not made perfect in love.",
                    reference: "1 John 4:18 (NIV)",
                    context: "John explains that God's perfect love for us eliminates fear, especially the fear of judgment, because those who understand God's love know they are secure in His acceptance."
                },
                {
                    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
                    reference: "John 14:27 (NIV)",
                    context: "Jesus spoke these words to His disciples before His crucifixion, promising them a lasting peace that comes from Him rather than temporary relief that the world offers."
                },
                {
                    text: "God is our refuge and strength, an ever-present help in trouble. Therefore we will not fear, though the earth give way and the mountains fall into the heart of the sea.",
                    reference: "Psalm 46:1-2 (NIV)",
                    context: "This psalm celebrates God as our safe haven and source of strength, declaring that even if the most catastrophic events occur, we can remain unafraid because of God's protection."
                },
                {
                    text: "For God has not given us a spirit of fear, but of power, of love and of sound mind.",
                    reference: "2 Timothy 1:7 (NIV)",
                    context: "Paul encourages Timothy to be bold in ministry by reminding him that fear doesn't come from God—instead, God gives us power, love, and wisdom to face challenges."
                },
                {
                    text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.",
                    reference: "Psalm 23:4 (NIV)",
                    context: "David uses the imagery of a shepherd caring for sheep to illustrate how God's presence provides comfort and security even in the most frightening circumstances."
                }
            ],
            hope: [
                {
                    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
                    reference: "Jeremiah 29:11 (NIV)",
                    context: "Written during the Babylonian exile, this verse reassured the Israelites that despite their current suffering, God had not forgotten them and was working toward their restoration and blessing."
                },
                {
                    text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
                    reference: "Isaiah 40:31 (NIV)",
                    context: "Isaiah encouraged the weary Israelites by reminding them that placing their trust in God's timing and power would give them supernatural strength to persevere through difficulties."
                },
                {
                    text: "May the God of hope fill you with all joy and peace as you trust in him, so that you may overflow with hope by the power of the Holy Spirit.",
                    reference: "Romans 15:13 (NIV)",
                    context: "Paul prays for the Roman believers, identifying God as the source of hope and connecting our hope to the Holy Spirit's power working within us."
                },
                {
                    text: "We have this hope as an anchor for the soul, firm and secure.",
                    reference: "Hebrews 6:19 (NIV)",
                    context: "The writer of Hebrews uses the metaphor of an anchor to describe how hope in Christ provides stability for our souls during life's storms and uncertainties."
                },
                {
                    text: "Why, my soul, are you downcast? Why so disturbed within me? Put your hope in God, for I will yet praise him, my Savior and my God.",
                    reference: "Psalm 42:11 (NIV)",
                    context: "The psalmist honestly acknowledges his depression while deliberately choosing to redirect his focus toward God's faithfulness, demonstrating how to speak truth to our troubled hearts."
                },
                {
                    text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
                    reference: "Romans 8:28 (NIV)",
                    context: "Paul assures believers that even in suffering and difficulty, God is actively working to bring about good purposes in the lives of those who love Him."
                },
                {
                    text: "The Lord delights in those who fear him, who put their hope in his unfailing love.",
                    reference: "Psalm 147:11 (NIV)",
                    context: "This psalm celebrates God's pleasure in those who reverence Him and trust in His steadfast love, showing that hope in God's character brings Him joy."
                },
                {
                    text: "Blessed is the one who trusts in the Lord, whose confidence is in him. They will be like a tree planted by the water that sends out its roots by the stream.",
                    reference: "Jeremiah 17:7-8 (NIV)",
                    context: "Jeremiah contrasts trusting in people versus trusting in God, using the image of a well-watered tree to show how hope in God provides lasting strength and stability."
                },
                {
                    text: "Be joyful in hope, patient in affliction, faithful in prayer.",
                    reference: "Romans 12:12 (NIV)",
                    context: "Paul provides a trinity of Christian virtues that sustain believers through difficulties: joy rooted in hope, patience during trials, and consistency in prayer."
                },
                {
                    text: "In his great mercy he has given us new birth into a living hope through the resurrection of Jesus Christ from the dead.",
                    reference: "1 Peter 1:3 (NIV)",
                    context: "Peter explains that our hope is not wishful thinking but a 'living hope' based on the reality of Christ's resurrection, which guarantees our spiritual rebirth and eternal future."
                }
            ],
            love: [
                {
                    text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.",
                    reference: "1 Corinthians 13:4-5 (NIV)",
                    context: "Paul wrote this to the Corinthian church to describe the nature of true Christian love, which serves as the foundation for all relationships and reflects God's love for us."
                },
                {
                    text: "See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!",
                    reference: "1 John 3:1 (NIV)",
                    context: "John marveled at the incredible love God has shown by adopting believers as His children, emphasizing that this isn't just a title but our true identity as members of God's family."
                },
                {
                    text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
                    reference: "Romans 5:8 (NIV)",
                    context: "Paul explains the radical nature of God's love—that He loved us and acted on our behalf even when we were His enemies, not waiting for us to become worthy first."
                },
                {
                    text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
                    reference: "John 3:16 (NIV)",
                    context: "Jesus spoke these words to Nicodemus, explaining that God's love for humanity was so great that He was willing to sacrifice His Son to provide salvation for all who believe."
                },
                {
                    text: "Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.",
                    reference: "1 John 4:7 (NIV)",
                    context: "John teaches that love is not just an emotion but evidence of our relationship with God, since love originates from God's character and nature."
                },
                {
                    text: "Above all, love each other deeply, because love covers over a multitude of sins.",
                    reference: "1 Peter 4:8 (NIV)",
                    context: "Peter encourages believers to prioritize love in their relationships, explaining that deep love has the power to overcome and forgive many offenses."
                },
                {
                    text: "A new command I give you: Love one another. As I have loved you, so you must love one another.",
                    reference: "John 13:34 (NIV)",
                    context: "Jesus gave this command to His disciples during the Last Supper, establishing that the standard for Christian love is not human affection but Christ's sacrificial love for us."
                },
                {
                    text: "And over all these virtues put on love, which binds them all together in perfect unity.",
                    reference: "Colossians 3:14 (NIV)",
                    context: "Paul describes love as the virtue that holds all other Christian characteristics together, like a belt that keeps clothing in place, creating unity and completeness."
                },
                {
                    text: "Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres.",
                    reference: "1 Corinthians 13:6-7 (NIV)",
                    context: "Paul continues his description of love's nature, showing that true love aligns with truth and goodness while demonstrating unwavering commitment and endurance."
                },
                {
                    text: "We love because he first loved us.",
                    reference: "1 John 4:19 (NIV)",
                    context: "John explains that our ability to love others flows from our experience of God's love for us—we're not generating love on our own but responding to the love we've received."
                }
            ],
            peace: [
                {
                    text: "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.",
                    reference: "John 14:27 (NIV)",
                    context: "Jesus spoke these words to His disciples before His crucifixion, promising them a lasting peace that comes from Him rather than temporary relief that the world offers."
                },
                {
                    text: "You will keep in perfect peace those whose minds are steadfast, because they trust in you.",
                    reference: "Isaiah 26:3 (NIV)",
                    context: "This verse from Isaiah's prophecy describes the deep, unshakeable peace that comes from fixing our thoughts on God and maintaining unwavering trust in His character and promises."
                },
                {
                    text: "And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.",
                    reference: "Philippians 4:7 (NIV)",
                    context: "Paul describes a supernatural peace that goes beyond human logic or reasoning, promising that this peace acts as a guard protecting our hearts and minds from anxiety and worry."
                },
                {
                    text: "Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
                    reference: "Colossians 3:15 (NIV)",
                    context: "Paul encourages believers to let Christ's peace be the deciding factor in their hearts and relationships, connecting peace with gratitude and unity in the church."
                },
                {
                    text: "The Lord gives strength to his people; the Lord blesses his people with peace.",
                    reference: "Psalm 29:11 (NIV)",
                    context: "David concludes a psalm about God's power by declaring that this same powerful God gives strength and peace to His people, showing that peace comes from divine blessing."
                },
                {
                    text: "Great peace have those who love your law, and nothing can make them stumble.",
                    reference: "Psalm 119:165 (NIV)",
                    context: "The psalmist connects peace with loving God's word and ways, suggesting that those who align their lives with God's truth experience stability and tranquility."
                },
                {
                    text: "I have told you these things, so that in me you may have peace. In this world you will have trouble. But take heart! I have overcome the world.",
                    reference: "John 16:33 (NIV)",
                    context: "Jesus spoke these words to His disciples before His crucifixion, acknowledging that trouble is inevitable but promising that His victory provides lasting peace."
                },
                {
                    text: "Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.",
                    reference: "2 Thessalonians 3:16 (NIV)",
                    context: "Paul closes his letter with a prayer for comprehensive peace—peace at all times and in every situation—identifying Jesus as the source of this peace."
                },
                {
                    text: "Blessed are the peacemakers, for they will be called children of God.",
                    reference: "Matthew 5:9 (NIV)",
                    context: "From the Beatitudes, Jesus declares that those who actively work to create peace and reconciliation reflect God's character and are recognized as His children."
                },
                {
                    text: "Turn from evil and do good; seek peace and pursue it.",
                    reference: "Psalm 34:14 (NIV)",
                    context: "David provides practical steps for righteous living, emphasizing that peace isn't passive but something we must actively seek and pursue in our choices and relationships."
                }
            ]
        };

        this.prayers = {
            anxiety: "Heavenly Father, I come to You with my worried heart. Please calm my anxious thoughts and help me trust in Your perfect plan. Give me Your peace that surpasses all understanding. In Jesus' name, Amen.",
            depression: "Lord, You see my heavy heart and know my pain. Please lift me up from this darkness and remind me of Your love and purpose for my life. Be my strength when I feel weak. Amen.",
            gratitude: "Thank You, Lord, for all Your blessings in my life. Help me to always remember Your goodness and to live with a grateful heart. May my thankfulness overflow to bless others. Amen.",
            loneliness: "Dear God, in my loneliness, remind me that You are always with me. Help me feel Your presence and open my heart to meaningful connections with others. You are my constant companion. Amen.",
            fear: "Father, when fear overwhelms me, help me remember that You are greater than anything I face. Give me courage and faith to trust in Your protection and guidance. In You, I find my security. Amen.",
            hope: "Lord, when I feel hopeless, remind me of Your promises and Your faithfulness throughout history. Renew my hope and help me see Your hand working in my life. You are my anchor. Amen.",
            love: "God of love, fill my heart with Your perfect love. Help me to love others as You have loved me, with patience, kindness, and forgiveness. Let Your love shine through me. Amen.",
            peace: "Prince of Peace, calm the storms in my heart and mind. Replace my anxiety with Your perfect peace. Help me to rest in Your presence and trust in Your control. Amen."
        };

        this.inspirationalQuotes = [
            { text: "Faith is taking the first step even when you don't see the whole staircase.", author: "Martin Luther King Jr." },
            { text: "God's love is like the rain that falls on all people, regardless of their worthiness.", author: "Henri Nouwen" },
            { text: "Prayer is not asking. It is a longing of the soul.", author: "Mahatma Gandhi" },
            { text: "Faith sees the invisible, believes the unbelievable, and receives the impossible.", author: "Corrie ten Boom" },
            { text: "God doesn't give us what we can handle. God helps us handle what we are given.", author: "Unknown" },
            { text: "Trust the wait. Embrace the uncertainty. Enjoy the beauty of becoming.", author: "Mandy Hale" },
            { text: "Sometimes God calms the storm, and sometimes He lets the storm rage and calms His child.", author: "Unknown" },
            { text: "Faith is the bird that feels the light when the dawn is still dark.", author: "Rabindranath Tagore" }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSettings();
        this.loadDailyVerse(); // Now async with external API
        this.showRandomQuote();
        // Attach refresh button event
        const refreshBtn = document.getElementById('refreshVerseBtn');
        if (refreshBtn) {
            refreshBtn.onclick = () => this.forceRefreshDailyVerse();
        }
        // Attach share button events for daily verse
        this.attachDailyVerseShareEvents();
        // Attach download as image event for daily verse
        const downloadBtn = document.getElementById('downloadDailyImage');
        if (downloadBtn) {
            downloadBtn.onclick = () => this.downloadDailyVerseImage();
        }
    }

    // Download daily verse as image
    downloadDailyVerseImage() {
        const verseTextEl = document.querySelector('.daily-verse .verse-text');
        const verseRefEl = document.querySelector('.daily-verse .verse-reference');
        const verseContextEl = document.querySelector('.daily-verse .verse-context');
        const text = verseTextEl ? verseTextEl.textContent : '';
        const reference = verseRefEl ? verseRefEl.textContent : '';
        const context = verseContextEl ? verseContextEl.textContent : '';
        const canvas = document.createElement('canvas');
        const width = 800;
        const height = 420;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        // Background
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        // Verse text
        ctx.font = 'bold 28px Georgia, serif';
        ctx.fillStyle = '#fff';
        wrapText(ctx, text, 60, 80, width - 120, 36);
        // Reference
        ctx.font = 'italic 22px Georgia, serif';
        ctx.fillStyle = '#ffe082';
        ctx.fillText(reference, 60, height - 80);
        // Context (optional, smaller)
        if (context) {
            ctx.font = '18px Georgia, serif';
            ctx.fillStyle = '#e0e0e0';
            wrapText(ctx, context, 60, height - 50, width - 120, 24);
        }
        // Download
        const link = document.createElement('a');
        link.download = 'faithfinder-verse.png';
        link.href = canvas.toDataURL('image/png');
        link.click();

        // Helper: wrapText
        function wrapText(context, text, x, y, maxWidth, lineHeight) {
            const words = text.split(' ');
            let line = '';
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = context.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
        }
    }

    // Attach share button events for daily verse
    attachDailyVerseShareEvents() {
        const whatsappBtn = document.getElementById('shareDailyWhatsapp');
        const facebookBtn = document.getElementById('shareDailyFacebook');
        const twitterBtn = document.getElementById('shareDailyTwitter');
        const emailBtn = document.getElementById('shareDailyEmail');
        if (whatsappBtn) whatsappBtn.onclick = () => this.shareDailyVerse('whatsapp');
        if (facebookBtn) facebookBtn.onclick = () => this.shareDailyVerse('facebook');
        if (twitterBtn) twitterBtn.onclick = () => this.shareDailyVerse('twitter');
        if (emailBtn) emailBtn.onclick = () => this.shareDailyVerse('email');
    }

    // Share logic for daily verse
    shareDailyVerse(platform) {
        const verseTextEl = document.querySelector('.daily-verse .verse-text');
        const verseRefEl = document.querySelector('.daily-verse .verse-reference');
        const text = verseTextEl ? verseTextEl.textContent : '';
        const reference = verseRefEl ? verseRefEl.textContent : '';
        const shareText = `${text} - ${reference}`;
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'Bible Verse from FaithFinder',
                text: shareText,
                url
            });
            return;
        }
        let shareUrl = '';
        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=Bible Verse from FaithFinder&body=${encodeURIComponent(shareText + '\n' + url)}`;
                break;
        }
        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    }

    bindEvents() {
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('settingsBtn').addEventListener('click', () => this.openSettings());
        document.getElementById('closeSettings').addEventListener('click', () => this.closeSettings());
        document.getElementById('fontFamily').addEventListener('change', (e) => this.changeFontFamily(e.target.value));
        document.getElementById('fontSize').addEventListener('input', (e) => this.changeFontSize(e.target.value));
        // Theme selector event
        const themeSelect = document.getElementById('themeSelect');
        if (themeSelect) {
            themeSelect.addEventListener('change', (e) => this.changeTheme(e.target.value));
        }
        // Dyslexia font toggle
        const dyslexiaFont = document.getElementById('dyslexiaFont');
        if (dyslexiaFont) {
            dyslexiaFont.addEventListener('change', (e) => this.toggleDyslexiaFont(e.target.checked));
        }
        // Line spacing
        const lineSpacing = document.getElementById('lineSpacing');
        if (lineSpacing) {
            lineSpacing.addEventListener('input', (e) => this.changeLineSpacing(e.target.value));
        }
        // Daily Reminder events
        const dailyReminderToggle = document.getElementById('dailyReminderToggle');
        const reminderTimeInput = document.getElementById('reminderTime');
        const reminderTimeGroup = document.getElementById('reminderTimeGroup');
        if (dailyReminderToggle) {
            dailyReminderToggle.addEventListener('change', (e) => {
                if (e.target.checked) {
                    reminderTimeGroup.style.display = '';
                    this.enableDailyReminder();
                } else {
                    reminderTimeGroup.style.display = 'none';
                    this.disableDailyReminder();
                }
            });
        }
        if (reminderTimeInput) {
            reminderTimeInput.addEventListener('change', () => {
                if (dailyReminderToggle.checked) {
                    this.enableDailyReminder();
                }
            });
        }
        // Journal navigation (no longer needed, handled by link to journal.html)
        document.getElementById('searchBtn').addEventListener('click', () => this.performSearch());
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.performSearch();
        });
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const emotion = tag.dataset.emotion;
                document.getElementById('searchInput').value = emotion;
                this.performSearch();
            });
        });
        document.getElementById('newQuoteBtn').addEventListener('click', () => this.showRandomQuote());
        document.addEventListener('click', (e) => {
            const settingsPanel = document.getElementById('settingsPanel');
            const settingsBtn = document.getElementById('settingsBtn');
            if (!settingsPanel.contains(e.target) && !settingsBtn.contains(e.target)) {
                this.closeSettings();
            }
        });
    }

    // Journal-related methods removed (now handled in journal.html)

    enableDailyReminder() {
        const reminderTimeInput = document.getElementById('reminderTime');
        const reminderStatus = document.getElementById('reminderStatus');
        const time = reminderTimeInput.value || '08:00';
        localStorage.setItem('dailyReminderEnabled', 'true');
        localStorage.setItem('dailyReminderTime', time);
        // Request notification permission
        if (Notification && Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                if (permission !== 'granted') {
                    reminderStatus.textContent = 'Notifications are blocked. Please allow notifications in your browser.';
                    return;
                } else {
                    this.scheduleDailyNotification(time);
                    reminderStatus.textContent = `Daily reminder set for ${time}.`;
                }
            });
        } else if (Notification && Notification.permission === 'granted') {
            this.scheduleDailyNotification(time);
            reminderStatus.textContent = `Daily reminder set for ${time}.`;
        } else {
            reminderStatus.textContent = 'Notifications are not supported in this browser.';
        }
    }

    disableDailyReminder() {
        localStorage.setItem('dailyReminderEnabled', 'false');
        const reminderStatus = document.getElementById('reminderStatus');
        if (reminderStatus) reminderStatus.textContent = 'Daily reminder disabled.';
        // Clear any scheduled notification (only works for current session)
        if (this._reminderTimeout) {
            clearTimeout(this._reminderTimeout);
            this._reminderTimeout = null;
        }
    }

    scheduleDailyNotification(time) {
        // Cancel previous
        if (this._reminderTimeout) {
            clearTimeout(this._reminderTimeout);
        }
        // Calculate ms until next reminder
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        const next = new Date();
        next.setHours(hours, minutes, 0, 0);
        if (next <= now) {
            next.setDate(next.getDate() + 1);
        }
        const msUntil = next - now;
        this._reminderTimeout = setTimeout(() => {
            this.showDailyVerseNotification();
            // Schedule next for 24h later
            this._reminderTimeout = setTimeout(() => this.showDailyVerseNotification(), 24 * 60 * 60 * 1000);
        }, msUntil);
    }

    showDailyVerseNotification() {
        if (Notification && Notification.permission === 'granted') {
            new Notification('FaithFinder', {
                body: 'Your daily verse is ready! Open FaithFinder to be inspired.',
                icon: '/favicon.ico'
            });
        }
    }

    // Enhanced loadDailyVerse method
    async loadDailyVerse() {
        const todayKey = 'dailyVerseDate';
        const verseKey = 'dailyVerseData';
        const today = new Date().toISOString().slice(0, 10);
        const savedDate = localStorage.getItem(todayKey);
        const savedVerseJSON = localStorage.getItem(verseKey);

        // Check if we have today's verse cached
        if (savedDate === today && savedVerseJSON) {
            try {
                const verseData = JSON.parse(savedVerseJSON);
                this.displayDailyVerse(verseData);
                return;
            } catch (e) {
                console.error("Error parsing cached daily verse:", e);
            }
        }
        // Fetch new verse for today
        await this.fetchNewDailyVerse(todayKey, verseKey, today);
    }

    // Method 1: Using Bible-API with random verses
    async fetchNewDailyVerse(dateKey, verseKey, today) {
        const verseTextEl = document.querySelector('.daily-verse .verse-text');
        const verseRefEl = document.querySelector('.daily-verse .verse-reference');
        const verseContextEl = document.querySelector('.daily-verse .verse-context');

        if (verseTextEl) verseTextEl.textContent = 'Loading daily verse...';
        try {
            // Method 1: Random verse from Bible-API
            let response = await fetch(this.bibleApiConfig.bibleApi.url);
            if (!response.ok) {
                throw new Error('Primary API failed');
            }
            let data = await response.json();
            // Format the data to match our expected structure
            const verseData = {
                text: data.text?.replace(/\s+/g, ' ').trim() || data.verse,
                reference: data.reference || `${data.book_name} ${data.chapter}:${data.verse}`,
                context: this.generateContext(data.reference || data.book_name)
            };
            // Cache the verse
            localStorage.setItem(dateKey, today);
            localStorage.setItem(verseKey, JSON.stringify(verseData));
            this.displayDailyVerse(verseData);
        } catch (error) {
            console.error('Error fetching daily verse:', error);
            await this.fallbackDailyVerse(dateKey, verseKey, today);
        }
    }

    // Method 2: Using Bible Gateway Verse of the Day
    async fetchBibleGatewayVOTD(dateKey, verseKey, today) {
        try {
            const response = await fetch(this.bibleApiConfig.bibleGateway.url);
            const data = await response.json();
            const verseData = {
                text: data.votd.text,
                reference: data.votd.reference,
                context: this.generateContext(data.votd.reference)
            };
            localStorage.setItem(dateKey, today);
            localStorage.setItem(verseKey, JSON.stringify(verseData));
            this.displayDailyVerse(verseData);
        } catch (error) {
            console.error('Bible Gateway API failed:', error);
            await this.fallbackDailyVerse(dateKey, verseKey, today);
        }
    }

    // Method 3: Random verse from predefined pool
    async fetchRandomFromPool(dateKey, verseKey, today) {
        try {
            // Get day of year to ensure same verse per day
            const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
            const selectedVerse = this.bibleApiConfig.randomVerses[dayOfYear % this.bibleApiConfig.randomVerses.length];
            const response = await fetch(`https://bible-api.com/${selectedVerse}`);
            const data = await response.json();
            const verseData = {
                text: data.text?.replace(/\s+/g, ' ').trim(),
                reference: data.reference,
                context: this.generateContext(data.reference)
            };
            localStorage.setItem(dateKey, today);
            localStorage.setItem(verseKey, JSON.stringify(verseData));
            this.displayDailyVerse(verseData);
        } catch (error) {
            console.error('Random pool method failed:', error);
            await this.fallbackDailyVerse(dateKey, verseKey, today);
        }
    }

    // Fallback method if all APIs fail
    async fallbackDailyVerse(dateKey, verseKey, today) {
        const fallbackVerses = [
            {
                text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
                reference: "Jeremiah 29:11 (NIV)",
                context: "Written during the Babylonian exile, this verse reassured the Israelites that despite their current suffering, God had not forgotten them."
            },
            {
                text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
                reference: "Proverbs 3:5-6 (NIV)",
                context: "This wisdom from Solomon teaches us to rely on God's wisdom rather than our limited human perspective."
            },
            {
                text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
                reference: "Romans 8:28 (NIV)",
                context: "Paul assures believers that even in suffering and difficulty, God is actively working to bring about good purposes."
            }
        ];
        // Use date to select consistent fallback verse
        const todayDate = new Date();
        const dayIndex = todayDate.getDate() % fallbackVerses.length;
        const verseData = fallbackVerses[dayIndex];
        localStorage.setItem(dateKey, todayDate.toISOString().slice(0, 10));
        localStorage.setItem(verseKey, JSON.stringify(verseData));
        this.displayDailyVerse(verseData);
    }

    // Generate context based on book name
    generateContext(reference) {
        const contextMap = {
            'John': 'The Gospel of John emphasizes Jesus as the Son of God and focuses on eternal life through faith.',
            'Psalm': 'The Psalms are prayers and songs that express the full range of human emotion in relationship with God.',
            'Romans': 'Paul\'s letter to the Romans systematically explains the gospel and Christian living.',
            'Philippians': 'Written from prison, this letter radiates joy and contentment in Christ despite circumstances.',
            'Jeremiah': 'Jeremiah prophesied during Judah\'s final years, offering hope amid judgment.',
            'Matthew': 'Matthew presents Jesus as the promised Messiah and King of the Jews.',
            'Isaiah': 'Isaiah prophesied about both judgment and restoration, pointing to the coming Messiah.',
            'Proverbs': 'Proverbs contains practical wisdom for daily living in relationship with God.',
            '1 Peter': 'Peter wrote to encourage Christians facing persecution and suffering.'
        };
        for (const [book, context] of Object.entries(contextMap)) {
            if (reference.includes(book)) {
                return context;
            }
        }
        return 'This verse reminds us of God\'s faithfulness and love in our daily lives.';
    }

    // Enhanced displayDailyVerse with better formatting
    displayDailyVerse(verseData) {
        const dailyVerseSection = document.querySelector('.daily-verse');
        const verseTextEl = document.querySelector('.daily-verse .verse-text');
        const verseRefEl = document.querySelector('.daily-verse .verse-reference');
        const verseContextEl = document.querySelector('.daily-verse .verse-context');
        if (!verseData) return;
        // Animation: fade-in effect
        if (dailyVerseSection) {
            dailyVerseSection.classList.remove('fade-in');
            void dailyVerseSection.offsetWidth; // force reflow
            dailyVerseSection.classList.add('fade-in');
        }
        if (verseTextEl) {
            // Clean up the text
            const cleanText = verseData.text
                .replace(/\n+/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            verseTextEl.textContent = `"${cleanText}"`;
        }
        if (verseRefEl) verseRefEl.textContent = verseData.reference || '';
        if (verseContextEl) {
            verseContextEl.innerHTML = '';
            if (verseData.context) {
                verseContextEl.innerHTML = `
<h4>Context:</h4>
<p>${verseData.context}</p>
`;
            }
        }
    }

    // Remove addRefreshButton (no longer needed, button is in HTML)

    // Force refresh daily verse
    async forceRefreshDailyVerse() {
        localStorage.removeItem('dailyVerseDate');
        localStorage.removeItem('dailyVerseData');
        await this.loadDailyVerse();
    }

    displayDailyVerse(verseData) {
        const verseTextEl = document.querySelector('.daily-verse .verse-text');
        const verseRefEl = document.querySelector('.daily-verse .verse-reference');
        const verseContextEl = document.querySelector('.daily-verse .verse-context');

        if (!verseData) return;

        if (verseTextEl) verseTextEl.textContent = `"${verseData.text}"`;
        if (verseRefEl) verseRefEl.textContent = verseData.reference || '';
        if (verseContextEl) {
            verseContextEl.innerHTML = '';
            if (verseData.context) {
                verseContextEl.innerHTML = `
                    <h4>Context:</h4>
                    <p>${verseData.context}</p>
                `;
            }
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeIcon = document.querySelector('#themeToggle i');
        themeIcon.className = this.currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        localStorage.setItem('theme', this.currentTheme);
    }

    openSettings() {
        document.getElementById('settingsPanel').classList.add('active');
    }

    closeSettings() {
        document.getElementById('settingsPanel').classList.remove('active');
    }

    changeFontFamily(fontFamily) {
        document.documentElement.style.setProperty('--font-family', fontFamily);
        localStorage.setItem('fontFamily', fontFamily);
    }

    changeFontSize(fontSize) {
        document.documentElement.style.setProperty('--font-size', fontSize + 'px');
        document.getElementById('fontSizeValue').textContent = fontSize + 'px';
        localStorage.setItem('fontSize', fontSize);
    }

    performSearch() {
        const query = document.getElementById('searchInput').value.toLowerCase().trim();
        if (!query) return;

        const emotion = this.findMatchingEmotion(query);
        if (emotion) {
            this.displayResults(emotion);
        } else {
            this.displayNoResults(query);
        }
    }

    findMatchingEmotion(query) {
        if (this.verses[query]) return query;

        const emotionMappings = {
            'anxious': 'anxiety',
            'worried': 'anxiety',
            'stress': 'anxiety',
            'nervous': 'anxiety',
            'sad': 'depression',
            'down': 'depression',
            'depressed': 'depression',
            'blue': 'depression',
            'alone': 'loneliness',
            'isolated': 'loneliness',
            'lonely': 'loneliness',
            'scared': 'fear',
            'afraid': 'fear',
            'fearful': 'fear',
            'terror': 'fear',
            'thankful': 'gratitude',
            'grateful': 'gratitude',
            'blessed': 'gratitude',
            'hopeful': 'hope',
            'optimistic': 'hope',
            'loving': 'love',
            'compassion': 'love',
            'peaceful': 'peace',
            'calm': 'peace',
            'serene': 'peace'
        };

        return emotionMappings[query] || null;
    }

    displayResults(emotion) {
        const resultsContainer = document.getElementById('resultsContainer');
        const verses = this.verses[emotion];
        const prayer = this.prayers[emotion];

        const resultsHTML = `
            <section class="search-results">
                <h3><i class="fas fa-heart"></i> Verses for ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</h3>
                ${verses.map(verse => `
                    <div class="verse-card">
                        <div class="verse-text">"${verse.text}"</div>
                        <div class="verse-reference">${verse.reference}</div>
                        <div class="verse-context">
                            <h4>Context:</h4>
                            <p>${verse.context}</p>
                        </div>
                        <div class="verse-actions">
                            <button class="secondary-btn" onclick="faithFinder.shareVerse('${verse.text}', '${verse.reference}', 'whatsapp')"><i class="fab fa-whatsapp"></i></button>
                            <button class="secondary-btn" onclick="faithFinder.shareVerse('${verse.text}', '${verse.reference}', 'facebook')"><i class="fab fa-facebook"></i></button>
                            <button class="secondary-btn" onclick="faithFinder.shareVerse('${verse.text}', '${verse.reference}', 'twitter')"><i class="fab fa-twitter"></i></button>
                            <button class="secondary-btn" onclick="faithFinder.shareVerse('${verse.text}', '${verse.reference}', 'email')"><i class="fas fa-envelope"></i></button>
                            <button class="secondary-btn" onclick="faithFinder.saveVerse('${verse.text}', '${verse.reference}')">
                                <i class="fas fa-bookmark"></i> Save
                            </button>
                        </div>
                    </div>
                `).join('')}

                <div class="prayer-section">
                    <h4><i class="fas fa-praying-hands"></i> Prayer for ${emotion.charAt(0).toUpperCase() + emotion.slice(1)}</h4>
                    <div class="prayer-card">
                        <div class="prayer-text">${prayer}</div>
                    </div>
                </div>
            </section>
        `;

        const existingResults = resultsContainer.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }

        // Insert and animate
        resultsContainer.insertAdjacentHTML('beforeend', resultsHTML);
        const newResults = resultsContainer.querySelector('.search-results');
        if (newResults) {
            newResults.classList.remove('fade-in');
            void newResults.offsetWidth;
            newResults.classList.add('fade-in');
        }

        newResults.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    displayNoResults(query) {
        const resultsContainer = document.getElementById('resultsContainer');
        const noResultsHTML = `
            <section class="search-results">
                <h3><i class="fas fa-search"></i> Search Results</h3>
                <div class="no-results">
                    <p>We couldn't find specific verses for "${query}", but remember that God cares about every aspect of your life.</p>
                    <p>Try one of these common situations:</p>
                    <div class="quick-tags">
                        <span class="tag" data-emotion="anxiety">Anxiety</span>
                        <span class="tag" data-emotion="hope">Hope</span>
                        <span class="tag" data-emotion="peace">Peace</span>
                        <span class="tag" data-emotion="love">Love</span>
                    </div>
                </div>
            </section>
        `;

        const existingResults = resultsContainer.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }

        // Insert and animate
        resultsContainer.insertAdjacentHTML('beforeend', noResultsHTML);
        const newResults = resultsContainer.querySelector('.search-results');
        if (newResults) {
            newResults.classList.remove('fade-in');
            void newResults.offsetWidth;
            newResults.classList.add('fade-in');
        }
    }

    showRandomQuote() {
        const randomQuote = this.inspirationalQuotes[Math.floor(Math.random() * this.inspirationalQuotes.length)];
        document.getElementById('dailyQuote').textContent = randomQuote.text;
        document.getElementById('quoteAuthor').textContent = `- ${randomQuote.author}`;
    }

    shareVerse(text, reference, platform) {
        const shareText = `"${text}" - ${reference}`;
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'Bible Verse from FaithFinder',
                text: shareText,
                url
            });
            return;
        }
        if (!platform) {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('Verse copied to clipboard!');
            });
            return;
        }
        let shareUrl = '';
        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + '\n' + url)}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(shareText)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}`;
                break;
            case 'email':
                shareUrl = `mailto:?subject=Bible Verse from FaithFinder&body=${encodeURIComponent(shareText + '\n' + url)}`;
                break;
        }
        if (shareUrl) {
            window.open(shareUrl, '_blank');
        }
    }

    saveVerse(text, reference) {
        const savedVerses = JSON.parse(localStorage.getItem('savedVerses') || '[]');
        const newVerse = { text, reference, savedAt: new Date().toISOString() };

        const isAlreadySaved = savedVerses.some(verse => 
            verse.text === text && verse.reference === reference
        );

        if (!isAlreadySaved) {
            savedVerses.push(newVerse);
            localStorage.setItem('savedVerses', JSON.stringify(savedVerses));
            this.showNotification('Verse saved successfully!');
        } else {
            this.showNotification('Verse is already saved!');
        }
        // If journal is open, re-render (no longer needed)
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animation: fade-in
        notification.classList.remove('fade-in');
        void notification.offsetWidth;
        notification.classList.add('fade-in');

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Fix: Add missing loadSettings method
    loadSettings() {
        // Theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            this.currentTheme = savedTheme;
            document.documentElement.setAttribute('data-theme', savedTheme);
            const themeIcon = document.querySelector('#themeToggle i');
            if (themeIcon) themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
            // Set theme selector value
            const themeSelect = document.getElementById('themeSelect');
            if (themeSelect) themeSelect.value = savedTheme;
        }
        // Font Family
        const savedFont = localStorage.getItem('fontFamily');
        if (savedFont) {
            document.documentElement.style.setProperty('--font-family', savedFont);
            const fontSelect = document.getElementById('fontFamily');
            if (fontSelect) fontSelect.value = savedFont;
        }
        // Dyslexia font
        const dyslexiaFont = localStorage.getItem('dyslexiaFont') === 'true';
        if (dyslexiaFont) {
            document.body.classList.add('dyslexia-font');
            const dyslexiaCheckbox = document.getElementById('dyslexiaFont');
            if (dyslexiaCheckbox) dyslexiaCheckbox.checked = true;
        } else {
            document.body.classList.remove('dyslexia-font');
            const dyslexiaCheckbox = document.getElementById('dyslexiaFont');
            if (dyslexiaCheckbox) dyslexiaCheckbox.checked = false;
        }
        // Font Size
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            document.documentElement.style.setProperty('--font-size', savedFontSize + 'px');
            const fontSizeInput = document.getElementById('fontSize');
            const fontSizeValue = document.getElementById('fontSizeValue');
            if (fontSizeInput) fontSizeInput.value = savedFontSize;
            if (fontSizeValue) fontSizeValue.textContent = savedFontSize + 'px';
        }
        // Line Spacing
        const savedLineSpacing = localStorage.getItem('lineSpacing');
        if (savedLineSpacing) {
            document.documentElement.style.setProperty('--line-spacing', savedLineSpacing);
            const lineSpacingInput = document.getElementById('lineSpacing');
            const lineSpacingValue = document.getElementById('lineSpacingValue');
            if (lineSpacingInput) lineSpacingInput.value = savedLineSpacing;
            if (lineSpacingValue) lineSpacingValue.textContent = savedLineSpacing;
        }
        // Daily Reminder
        const dailyReminderEnabled = localStorage.getItem('dailyReminderEnabled') === 'true';
        const dailyReminderToggle = document.getElementById('dailyReminderToggle');
        const reminderTimeGroup = document.getElementById('reminderTimeGroup');
        const reminderTimeInput = document.getElementById('reminderTime');
        const reminderStatus = document.getElementById('reminderStatus');
        const savedTime = localStorage.getItem('dailyReminderTime') || '08:00';
        if (dailyReminderToggle) dailyReminderToggle.checked = dailyReminderEnabled;
        if (reminderTimeInput) reminderTimeInput.value = savedTime;
        if (dailyReminderEnabled) {
            if (reminderTimeGroup) reminderTimeGroup.style.display = '';
            this.enableDailyReminder();
        } else {
            if (reminderTimeGroup) reminderTimeGroup.style.display = 'none';
            this.disableDailyReminder();
        }
    }

    // Theme change handler
    changeTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update theme icon for light/dark
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) themeIcon.className = theme === 'light' ? 'fas fa-moon' : (theme === 'dark' ? 'fas fa-sun' : 'fas fa-palette');
    }

    // Dyslexia font toggle
    toggleDyslexiaFont(enabled) {
        if (enabled) {
            document.body.classList.add('dyslexia-font');
            localStorage.setItem('dyslexiaFont', 'true');
        } else {
            document.body.classList.remove('dyslexia-font');
            localStorage.setItem('dyslexiaFont', 'false');
        }
    }

    // Line spacing change
    changeLineSpacing(value) {
        document.documentElement.style.setProperty('--line-spacing', value);
        const lineSpacingValue = document.getElementById('lineSpacingValue');
        if (lineSpacingValue) lineSpacingValue.textContent = value;
        localStorage.setItem('lineSpacing', value);
    }

    // Theme change handler
    changeTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update theme icon for light/dark
        const themeIcon = document.querySelector('#themeToggle i');
        if (themeIcon) themeIcon.className = theme === 'light' ? 'fas fa-moon' : (theme === 'dark' ? 'fas fa-sun' : 'fas fa-palette');
    }
}

// Global functions for modal/popup functionality
function showAbout() {
    const aboutHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>About FaithFinder</h3>
                    <button onclick="closeModal()" class="close-btn" aria-label="Close About">&times;</button>
                </div>
                <div class="modal-body">
                    <p>FaithFinder is designed to help you discover God's word for your current situation. Whether you're feeling anxious, grateful, lonely, or hopeful, there's a Bible verse that speaks to your heart.</p>
                    <p>Our mission is to make Scripture accessible and relevant to your daily life, providing comfort, guidance, and encouragement when you need it most.</p>
                    <p>May God bless you on your spiritual journey.</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', aboutHTML);
}

function showContact() {
    const contactHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h3>Contact Us</h3>
                    <button onclick="closeModal()" class="close-btn" aria-label="Close Contact">&times;</button>
                </div>
                <div class="modal-body">
                    <p>We'd love to hear from you! If you have suggestions, prayer requests, or feedback about FaithFinder, please reach out.</p>
                    <div class="contact-info">
                        <p><i class="fas fa-envelope"></i> Email: hello@faithfinder.com</p>
                        <p><i class="fas fa-globe"></i> Website: www.faithfinder.com</p>
                    </div>
                    <p>Your spiritual journey matters to us, and we're here to support you with God's word.</p>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', contactHTML);
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

// Initialize the app
let faithFinder;
document.addEventListener('DOMContentLoaded', () => {
    faithFinder = new FaithFinder();
    initVoiceSearch();
});

// Voice Search Functionality
let recognition;
let isListening = false;

function initVoiceSearch() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();

        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onstart = function() {
            isListening = true;
            const btn = document.getElementById('voiceSearchBtn');
            btn.classList.add('listening');
            btn.innerHTML = '<i class="fas fa-stop"></i> Listening...';
            btn.title = 'Click to stop listening';
        };

        recognition.onresult = function(event) {
            const transcript = event.results[0][0].transcript;
            document.getElementById('searchInput').value = transcript;

            const btn = document.getElementById('voiceSearchBtn');
            btn.innerHTML = '<i class="fas fa-check"></i> Got it!';
            btn.style.background = '#28a745';

            setTimeout(() => {
                faithFinder.performSearch();
            }, 500);
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
            let errorMessage;
            switch(event.error) {
                case 'not-allowed':
                    errorMessage = 'Microphone access denied. Please allow microphone access and try again.';
                    break;
                case 'no-speech':
                    errorMessage = 'No speech detected. Please try again.';
                    break;
                case 'network':
                    errorMessage = 'Network error. Please check your connection and try again.';
                    break;
                default:
                    errorMessage = 'Voice search error. Please try again.';
            }
            alert(errorMessage);
            stopVoiceSearch();
        };

        recognition.onend = function() {
            stopVoiceSearch();
        };
    } else {
        const voiceBtn = document.getElementById('voiceSearchBtn');
        if (voiceBtn) {
            voiceBtn.style.display = 'none';
        }
        console.log('Speech recognition not supported in this browser');
    }
}

function startVoiceSearch() {
    if (!recognition) {
        alert('Voice search is not supported in your browser. Please try Chrome, Edge, or Safari.');
        return;
    }

    if (isListening) {
        recognition.stop();
        return;
    }

    try {
        recognition.start();
    } catch (error) {
        console.error('Error starting voice recognition:', error);
        alert('Could not start voice search. Please try again.');
    }
}

function stopVoiceSearch() {
    isListening = false;
    const btn = document.getElementById('voiceSearchBtn');
    if (btn) {
        btn.classList.remove('listening');
        btn.innerHTML = '<i class="fas fa-microphone"></i>';
        btn.title = 'Voice Search';
        btn.style.background = '#28a745';
    }
}

