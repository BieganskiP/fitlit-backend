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
                    <a href="index.html" data-type="index-link">fitlit-backend documentation</a>
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
                                            'data-bs-target="#controllers-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' : 'data-bs-target="#xs-controllers-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' :
                                            'id="xs-controllers-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' :
                                        'id="xs-injectables-links-module-AppModule-9afc0c0e875d7aac6449d82748c9287afbe05471296d9127f02a592956865693464ad8e3faf18ced3a5462be6781b1fb59099b527362223db40c6dc6df33a7e5"' }>
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
                                            'data-bs-target="#controllers-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' :
                                            'id="xs-controllers-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' :
                                        'id="xs-injectables-links-module-AuthModule-d8b15a4ec58b9c6b86164ea301f013b70120c426d4410fcdf512b19806607dc14571742240b2760d54d21e64b6048416181a58bcd8c48cc828fb581cbb353017"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/GuardsModule.html" data-type="entity-link" >GuardsModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-GuardsModule-3636a42655f368d788f4cf50e7ae12c7bd67b3a046dcaad5687c24c90aefa89ccd589a230a6b90e5bf4f7e7bf584f3fcf7e8cbdb63048e7da858218fca1914b7"' : 'data-bs-target="#xs-injectables-links-module-GuardsModule-3636a42655f368d788f4cf50e7ae12c7bd67b3a046dcaad5687c24c90aefa89ccd589a230a6b90e5bf4f7e7bf584f3fcf7e8cbdb63048e7da858218fca1914b7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-GuardsModule-3636a42655f368d788f4cf50e7ae12c7bd67b3a046dcaad5687c24c90aefa89ccd589a230a6b90e5bf4f7e7bf584f3fcf7e8cbdb63048e7da858218fca1914b7"' :
                                        'id="xs-injectables-links-module-GuardsModule-3636a42655f368d788f4cf50e7ae12c7bd67b3a046dcaad5687c24c90aefa89ccd589a230a6b90e5bf4f7e7bf584f3fcf7e8cbdb63048e7da858218fca1914b7"' }>
                                        <li class="link">
                                            <a href="injectables/UserLimitService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserLimitService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-477b9a15b1674e8f9661adc11160dd8df457391fa70e8284a00a878df33b4178fdaf9940bed79a81b159012933410fbfc821b184fc27366b11c2d181fdee1206"' : 'data-bs-target="#xs-injectables-links-module-MailModule-477b9a15b1674e8f9661adc11160dd8df457391fa70e8284a00a878df33b4178fdaf9940bed79a81b159012933410fbfc821b184fc27366b11c2d181fdee1206"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-477b9a15b1674e8f9661adc11160dd8df457391fa70e8284a00a878df33b4178fdaf9940bed79a81b159012933410fbfc821b184fc27366b11c2d181fdee1206"' :
                                        'id="xs-injectables-links-module-MailModule-477b9a15b1674e8f9661adc11160dd8df457391fa70e8284a00a878df33b4178fdaf9940bed79a81b159012933410fbfc821b184fc27366b11c2d181fdee1206"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' :
                                            'id="xs-controllers-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' :
                                        'id="xs-injectables-links-module-UsersModule-ec79576f5e5db578a2969917f49a7e40c7634f34f666d6f490557305991800078be9dfcd7be21ca3976068f8a5095bddf5a438c4514d54544b9916be416fb68b"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
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
                                    <a href="entities/Company.html" data-type="entity-link" >Company</a>
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
                                <a href="classes/CompleteRegistrationDto.html" data-type="entity-link" >CompleteRegistrationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCompanyDto.html" data-type="entity-link" >CreateCompanyDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateInvitationDto.html" data-type="entity-link" >CreateInvitationDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateSuperAdminDto.html" data-type="entity-link" >CreateSuperAdminDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FeatureRestrictionFilter.html" data-type="entity-link" >FeatureRestrictionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/FilterUsersDto.html" data-type="entity-link" >FilterUsersDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserProfileDto.html" data-type="entity-link" >UpdateUserProfileDto</a>
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
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MailService.html" data-type="entity-link" >MailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserLimitService.html" data-type="entity-link" >UserLimitService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/CompanyAccessGuard.html" data-type="entity-link" >CompanyAccessGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/FeatureGuard.html" data-type="entity-link" >FeatureGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserLimitGuard.html" data-type="entity-link" >UserLimitGuard</a>
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
                                <a href="interfaces/FeatureConfig.html" data-type="entity-link" >FeatureConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PlanLimits.html" data-type="entity-link" >PlanLimits</a>
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
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
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