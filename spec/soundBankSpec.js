describe('SoundBank', function () {
  var lisa;

  beforeEach(function () {
    lisa = new SoundBank();
  });

  describe('setPlayerVols', function () {
    beforeEach(function () {
      spyOn(lisa, '_setMeowVol');
      spyOn(lisa, '_setScamperVol');
      spyOn(lisa, '_setThemeVol');
    });

    it('calls the set volume functions for the player sounds', function () {
      lisa.setPlayerVols();
      expect(lisa._setMeowVol).toHaveBeenCalled();
      expect(lisa._setScamperVol).toHaveBeenCalled();
      expect(lisa._setThemeVol).toHaveBeenCalled();
    });
  });

  describe('#setObjectVols', function () {
    beforeEach(function () {
      spyOn(lisa, '_setGlassCrashVol');
      spyOn(lisa, '_setMetalCrashVol');
      spyOn(lisa, '_setChinaCrashVol');
      spyOn(lisa, '_setWoodCrashVol');
      spyOn(lisa, '_setPingVol');
    });

    it('calls the set volume functions for the player sounds', function () {
      lisa.setObjectVols();
      expect(lisa._setGlassCrashVol).toHaveBeenCalled();
      expect(lisa._setMetalCrashVol).toHaveBeenCalled();
      expect(lisa._setChinaCrashVol).toHaveBeenCalled();
      expect(lisa._setWoodCrashVol).toHaveBeenCalled();
      expect(lisa._setPingVol).toHaveBeenCalled();
    });
  });

  describe('#resetThemeTime', function () {
    it('sets the theme current time to 0', function () {
      lisa.resetThemeTime();
      expect(lisa.gameTheme.currentTime).toEqual(0);
    });
  });

  describe('#_setThemeVol', function () {
    it('sets the theme volume', function () {
      lisa._setThemeVol();
      expect(lisa.gameTheme.volume).toBeDefined();
    });
  });

  describe('#_setMeowVol', function () {
    it('sets the meow volume', function () {
      lisa._setMeowVol();
      expect(lisa.meow1.volume).toBeDefined();
    });
  });

  describe('#_setScamperVol', function () {
    it('sets the scamper volume', function () {
      lisa._setScamperVol();
      expect(lisa.scamper.volume).toBeDefined();
    });
  });

  describe('#_setGlassCrashVol', function () {
    it('sets the glassCrash volume', function () {
      lisa._setGlassCrashVol();
      expect(lisa.glassCrash.volume).toBeDefined();
    });
  });

  describe('#_setMetalCrashVol', function () {
    it('sets the metalCrash volume', function () {
      lisa._setMetalCrashVol();
      expect(lisa.metalCrash.volume).toBeDefined();
    });
  });

  describe('#_setChinaCrashVol', function () {
    it('sets the chinaCrash volume', function () {
      lisa._setChinaCrashVol();
      expect(lisa.chinaCrash.volume).toBeDefined();
    });
  });

  describe('#_setWoodCrashVol', function () {
    it('sets the woodCrash volume', function () {
      lisa._setWoodCrashVol();
      expect(lisa.woodCrash.volume).toBeDefined();
    });
  });

  describe('#_setPingVol', function () {
    it('sets the ping volume', function () {
      lisa._setPingVol();
      expect(lisa.ping.volume).toBeDefined();
    });
  });
});
