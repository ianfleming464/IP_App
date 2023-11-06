const countries = [
  {
    name: 'China',
    trademarkUrl: 'https://www.ip-coster.com/IPGuides/trademark-china',
    industrialDesignUrl: 'https://www.ip-coster.com/IPGuides/industrial-design-china',
  },
  {
    name: 'USA',
    trademarkUrl: 'https://www.ip-coster.com/IPGuides/trademark-us',
    industrialDesignUrl: 'https://www.ip-coster.com/IPGuides/industrial-design-us',
    xPaths: {
      examinationPublicationOpposition:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[8]/span',
      grantValidityRenewal:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[10]/span',
      useRequirement:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[12]/span',
      durationRegistrationPeriod:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[11]/span',
      examination: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[8]/span',
    },
  },
  {
    name: 'Canada',
    trademarkUrl: 'https://www.ip-coster.com/IPGuides/trademark-canada',
    industrialDesignUrl: 'https://www.ip-coster.com/IPGuides/industrial-design-canada',
  },
  {
    name: 'Switzerland',
    trademarkUrl: 'https://www.ip-coster.com/IPGuides/trademark-switzerland',
    industrialDesignUrl: 'https://www.ip-coster.com/IPGuides/industrial-design-switzerland',
    xPaths: {
      filingRequirements:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[4]/span',
      useRequirement: '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[8]/span',
    },
  },
  {
    name: 'United Kingdom',
    trademarkUrl: 'https://www.ip-coster.com/IPGuides/trademark-united-kingdom',
    industrialDesignUrl: 'https://www.ip-coster.com/IPGuides/industrial-design-united-kingdom',
    xPaths: {
      examinationPublicationOpposition:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[7]/span',
      grantValidityRenewal:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[8]/span',
      useRequirement:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[10]/span',
      durationRegistrationPeriod:
        '/html/body/form/div[6]/div[3]/div/div[2]/div[1]/div[1]/div/div[3]/p[9]/span',
    },
  },
];

module.exports = countries;
