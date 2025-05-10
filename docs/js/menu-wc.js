'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-intro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-42920ce44029c5b62b377c23f654dce04ab113bf975a635d9dfe46f72127ccdebe0bef7c20cb0ce2e7a3d72773d2b78987a52656e93b4e61014e645b0539de1b"' : 'data-bs-target="#xs-controllers-links-module-AppModule-42920ce44029c5b62b377c23f654dce04ab113bf975a635d9dfe46f72127ccdebe0bef7c20cb0ce2e7a3d72773d2b78987a52656e93b4e61014e645b0539de1b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-42920ce44029c5b62b377c23f654dce04ab113bf975a635d9dfe46f72127ccdebe0bef7c20cb0ce2e7a3d72773d2b78987a52656e93b4e61014e645b0539de1b"' :
                                            'id="xs-controllers-links-module-AppModule-42920ce44029c5b62b377c23f654dce04ab113bf975a635d9dfe46f72127ccdebe0bef7c20cb0ce2e7a3d72773d2b78987a52656e93b4e61014e645b0539de1b"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-42920ce44029c5b62b377c23f654dce04ab113bf975a635d9dfe46f72127ccdebe0bef7c20cb0ce2e7a3d72773d2b78987a52656e93b4e61014e645b0539de1b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-42920ce44029c5b62b377c23f654dce04ab113bf975a635d9dfe46f72127ccdebe0bef7c20cb0ce2e7a3d72773d2b78987a52656e93b4e61014e645b0539de1b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-42920ce44029c5b62b377c23f654dce04ab113bf975a635d9dfe46f72127ccdebe0bef7c20cb0ce2e7a3d72773d2b78987a52656e93b4e61014e645b0539de1b"' :
                                        'id="xs-injectables-links-module-AppModule-42920ce44029c5b62b377c23f654dce04ab113bf975a635d9dfe46f72127ccdebe0bef7c20cb0ce2e7a3d72773d2b78987a52656e93b4e61014e645b0539de1b"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-83cac056e2457b6515179ba53c814ca4197b8ef367e5614461f70ecf6aba740f8facf38dd50982cdd83c644d269a48dcd90413e4fe0c438627c2d60378c21d0d"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-83cac056e2457b6515179ba53c814ca4197b8ef367e5614461f70ecf6aba740f8facf38dd50982cdd83c644d269a48dcd90413e4fe0c438627c2d60378c21d0d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-83cac056e2457b6515179ba53c814ca4197b8ef367e5614461f70ecf6aba740f8facf38dd50982cdd83c644d269a48dcd90413e4fe0c438627c2d60378c21d0d"' :
                                            'id="xs-controllers-links-module-AuthModule-83cac056e2457b6515179ba53c814ca4197b8ef367e5614461f70ecf6aba740f8facf38dd50982cdd83c644d269a48dcd90413e4fe0c438627c2d60378c21d0d"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-83cac056e2457b6515179ba53c814ca4197b8ef367e5614461f70ecf6aba740f8facf38dd50982cdd83c644d269a48dcd90413e4fe0c438627c2d60378c21d0d"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-83cac056e2457b6515179ba53c814ca4197b8ef367e5614461f70ecf6aba740f8facf38dd50982cdd83c644d269a48dcd90413e4fe0c438627c2d60378c21d0d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-83cac056e2457b6515179ba53c814ca4197b8ef367e5614461f70ecf6aba740f8facf38dd50982cdd83c644d269a48dcd90413e4fe0c438627c2d60378c21d0d"' :
                                        'id="xs-injectables-links-module-AuthModule-83cac056e2457b6515179ba53c814ca4197b8ef367e5614461f70ecf6aba740f8facf38dd50982cdd83c644d269a48dcd90413e4fe0c438627c2d60378c21d0d"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/SignInProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignInProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MetaOptionsModule.html" data-type="entity-link" >MetaOptionsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-MetaOptionsModule-9be36be2254209ed20c4b33229643e896e53bc1902981be288a89a9eef40f8ce5fd108f7ca4c91cd597ecc060db48dc903399206a062365392b9420904502aff"' : 'data-bs-target="#xs-controllers-links-module-MetaOptionsModule-9be36be2254209ed20c4b33229643e896e53bc1902981be288a89a9eef40f8ce5fd108f7ca4c91cd597ecc060db48dc903399206a062365392b9420904502aff"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-MetaOptionsModule-9be36be2254209ed20c4b33229643e896e53bc1902981be288a89a9eef40f8ce5fd108f7ca4c91cd597ecc060db48dc903399206a062365392b9420904502aff"' :
                                            'id="xs-controllers-links-module-MetaOptionsModule-9be36be2254209ed20c4b33229643e896e53bc1902981be288a89a9eef40f8ce5fd108f7ca4c91cd597ecc060db48dc903399206a062365392b9420904502aff"' }>
                                            <li class="link">
                                                <a href="controllers/MetaOptionsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MetaOptionsModule-9be36be2254209ed20c4b33229643e896e53bc1902981be288a89a9eef40f8ce5fd108f7ca4c91cd597ecc060db48dc903399206a062365392b9420904502aff"' : 'data-bs-target="#xs-injectables-links-module-MetaOptionsModule-9be36be2254209ed20c4b33229643e896e53bc1902981be288a89a9eef40f8ce5fd108f7ca4c91cd597ecc060db48dc903399206a062365392b9420904502aff"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MetaOptionsModule-9be36be2254209ed20c4b33229643e896e53bc1902981be288a89a9eef40f8ce5fd108f7ca4c91cd597ecc060db48dc903399206a062365392b9420904502aff"' :
                                        'id="xs-injectables-links-module-MetaOptionsModule-9be36be2254209ed20c4b33229643e896e53bc1902981be288a89a9eef40f8ce5fd108f7ca4c91cd597ecc060db48dc903399206a062365392b9420904502aff"' }>
                                        <li class="link">
                                            <a href="injectables/MetaOptionsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MetaOptionsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PaginationModule.html" data-type="entity-link" >PaginationModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' : 'data-bs-target="#xs-injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' :
                                        'id="xs-injectables-links-module-PaginationModule-c999ec83fa446b9ea19d24ee0a6e56c581d86a5632cf36ae10c29d023d3c04796a0ed53a4d793419d8e1b10f6bd03438e096eafb9c8ddd56a9755c3470044f4b"' }>
                                        <li class="link">
                                            <a href="injectables/PaginationProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginationProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-ca6c15bc4aa31c55cbe507a0c3a8b7dc53cf7e9d839322e6ba00690257713e54a817b9e9badd346e9631a94ce0f88af0accd3c9c8b9faf8bc964f0226570d667"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-ca6c15bc4aa31c55cbe507a0c3a8b7dc53cf7e9d839322e6ba00690257713e54a817b9e9badd346e9631a94ce0f88af0accd3c9c8b9faf8bc964f0226570d667"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-ca6c15bc4aa31c55cbe507a0c3a8b7dc53cf7e9d839322e6ba00690257713e54a817b9e9badd346e9631a94ce0f88af0accd3c9c8b9faf8bc964f0226570d667"' :
                                            'id="xs-controllers-links-module-PostsModule-ca6c15bc4aa31c55cbe507a0c3a8b7dc53cf7e9d839322e6ba00690257713e54a817b9e9badd346e9631a94ce0f88af0accd3c9c8b9faf8bc964f0226570d667"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-ca6c15bc4aa31c55cbe507a0c3a8b7dc53cf7e9d839322e6ba00690257713e54a817b9e9badd346e9631a94ce0f88af0accd3c9c8b9faf8bc964f0226570d667"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-ca6c15bc4aa31c55cbe507a0c3a8b7dc53cf7e9d839322e6ba00690257713e54a817b9e9badd346e9631a94ce0f88af0accd3c9c8b9faf8bc964f0226570d667"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-ca6c15bc4aa31c55cbe507a0c3a8b7dc53cf7e9d839322e6ba00690257713e54a817b9e9badd346e9631a94ce0f88af0accd3c9c8b9faf8bc964f0226570d667"' :
                                        'id="xs-injectables-links-module-PostsModule-ca6c15bc4aa31c55cbe507a0c3a8b7dc53cf7e9d839322e6ba00690257713e54a817b9e9badd346e9631a94ce0f88af0accd3c9c8b9faf8bc964f0226570d667"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/TagsModule.html" data-type="entity-link" >TagsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' : 'data-bs-target="#xs-controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' :
                                            'id="xs-controllers-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                            <li class="link">
                                                <a href="controllers/TagsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' : 'data-bs-target="#xs-injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' :
                                        'id="xs-injectables-links-module-TagsModule-2e1b911d3c95e802ad1c8c16e19955e31aa1137761a19ff1a4dadec9c29355403d0739360f0c37540259fd4eaccca391e583afa0ae891af09c14b1309a949b47"' }>
                                        <li class="link">
                                            <a href="injectables/TagsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TagsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-d064039c433455d3983f6ac9b11ebf2fa032c60b8d464f0a8b237bcd08135df02fdabad19953753d5400ebb8c10a6c74de34b33165f07fdc775cfc66e11e0f8d"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-d064039c433455d3983f6ac9b11ebf2fa032c60b8d464f0a8b237bcd08135df02fdabad19953753d5400ebb8c10a6c74de34b33165f07fdc775cfc66e11e0f8d"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-d064039c433455d3983f6ac9b11ebf2fa032c60b8d464f0a8b237bcd08135df02fdabad19953753d5400ebb8c10a6c74de34b33165f07fdc775cfc66e11e0f8d"' :
                                            'id="xs-controllers-links-module-UsersModule-d064039c433455d3983f6ac9b11ebf2fa032c60b8d464f0a8b237bcd08135df02fdabad19953753d5400ebb8c10a6c74de34b33165f07fdc775cfc66e11e0f8d"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-d064039c433455d3983f6ac9b11ebf2fa032c60b8d464f0a8b237bcd08135df02fdabad19953753d5400ebb8c10a6c74de34b33165f07fdc775cfc66e11e0f8d"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-d064039c433455d3983f6ac9b11ebf2fa032c60b8d464f0a8b237bcd08135df02fdabad19953753d5400ebb8c10a6c74de34b33165f07fdc775cfc66e11e0f8d"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-d064039c433455d3983f6ac9b11ebf2fa032c60b8d464f0a8b237bcd08135df02fdabad19953753d5400ebb8c10a6c74de34b33165f07fdc775cfc66e11e0f8d"' :
                                        'id="xs-injectables-links-module-UsersModule-d064039c433455d3983f6ac9b11ebf2fa032c60b8d464f0a8b237bcd08135df02fdabad19953753d5400ebb8c10a6c74de34b33165f07fdc775cfc66e11e0f8d"' }>
                                        <li class="link">
                                            <a href="injectables/CreateUserProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CreateUserProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/FindOneByEmailProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FindOneByEmailProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ManyUsersProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ManyUsersProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#entities-links"' :
                                'data-bs-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MetaOption.html" data-type="entity-link" >MetaOption</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Post.html" data-type="entity-link" >Post</a>
                                </li>
                                <li class="link">
                                    <a href="entities/Tag.html" data-type="entity-link" >Tag</a>
                                </li>
                                <li class="link">
                                    <a href="entities/User.html" data-type="entity-link" >User</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateManyUsersDto.html" data-type="entity-link" >CreateManyUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateMetaOptionsDto.html" data-type="entity-link" >CreateMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateTagDto.html" data-type="entity-link" >CreateTagDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsBaseDto.html" data-type="entity-link" >GetPostsBaseDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetPostsDto.html" data-type="entity-link" >GetPostsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUserParamDto.html" data-type="entity-link" >GetUserParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PaginationQueryDto.html" data-type="entity-link" >PaginationQueryDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignInDto.html" data-type="entity-link" >SignInDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdatePostDto.html" data-type="entity-link" >UpdatePostDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BcryptProvider.html" data-type="entity-link" >BcryptProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HashingProvider.html" data-type="entity-link" >HashingProvider</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ManyUsersProvider.html" data-type="entity-link" >ManyUsersProvider</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Paginated.html" data-type="entity-link" >Paginated</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});