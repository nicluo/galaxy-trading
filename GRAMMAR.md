/**
 * Galaxy Trader Grammar
 * =====================
 * Paste this into https://pegjs.org/online to give it a whirl!
 */

Expression
  = ResourceQuery
  / NumQuery
  / ResourceDef
  / RNumDef

/**
 * RNumDef is a statement for number definitions
 * example: glob is I
 * The following characters are supported: A-Z, a-z and 0-9
 * The available roman numerals to be aliased are I V X L C D M
 **/
RNumDef
  = _ r:RNumAlias ws is ws i:RNumCharacter _ {
  return {
    type: 'number_definition',
    to: r,
    from: i
  };
}

RNumAlias "roman numeral alias candidate"
  = !keywords r:([a-z0-9]i*) { return r.join(''); }

RNumCharacter
  = [i|v|x|l|c|d|m]i

/**
 * ResourceDef is a statement for resource definitions
 * example: 1 Credit is 10 Iron
 *          blog Carrot is blog Copper
 * The following characters are supported for Resources: A-Z, a-z and 0-9
 * It is optional to use Roman numerals, thus the conversion can still be used on
 * Earth if you are rich enough
 **/
ResourceDef
  = _ n1:AnyNum ws r1:ResourceCandidate ws is ws n2:AnyNum ws r2:ResourceCandidate _ {
  return {
    type: 'resource_definition',
    to: r1,
    to_count: n1.v,
    to_word: n1.w,
    from: r2,
    from_count: n2.v,
    from_word: n2.w
  };
}

ResourceCandidate "resource candidate"
  = !keywords &([a-z0-9]i* !char) r:[a-z0-9]i* { return r.join(''); }

/**
 * NumQuery is a query for converting roman numerals to integers
 * example: how much is x x x ?
 **/
NumQuery
  = _ how_much_is ws r:RNum _ qns _ {
  return {
    type: 'num_query',
    count: r.v,
    word: r.w
  };
}

/**
 * ResourceQuery is a query for converting from one resource to another
 * example: how many Iron is x x x Credits ?
 *          how many Iron is 10 Credits ?
 * It is optional to use Roman numerals, thus the conversion can still be used on
 * Earth if you are rich enough
 **/
ResourceQuery
  = _ how_many ws r1:Resource ws is ws n:AnyNum ws r2:Resource _ qns _ {
  return {
    type: 'resource_query',
    to: r1,
    from: r2,
    from_count: n.v,
    from_word: n.w
  };
}

/**
 * AnyNum is shorthand for integer or roman numeral
 **/
AnyNum
  = Integer
  / RNum

/**
 * RNum is the definition for roman numerals
 **/
RNum
  = k:Kilo h:Hecto d:Deca o:One {
    var w = [k.w, h.w, d.w, o.w].join(' ');
    w = w.replace(/[ ]+/g, ' ').replace(/^ */, '').replace(/ *$/, '');
    var v = k.v + h.v + d.v + o.v;
    return {w: w, v: v};
  }

Kilo
  = KiloSimple

KiloSimple
  = i:(RomanM? RomanM? RomanM?) {
    var w = [];
    var v = 0;
    for(var x=0; x < i.length; x++) {
  	  if(i[x]) {
    	w.push(i[x].w);
	    v += i[x].v;
      }
    }
    return { w: w.join(' '), v: v };
  }

Hecto
  = HectoDeduct
  / HectoAdd
  / HectoSimple

HectoDeduct
  = i:RomanC j:(RomanM / RomanD) {
    return { w: [i.w, j.w].join(' '), v: i.v + j.v };
  }

HectoAdd
  = v:RomanD s:HectoSimple {
    return { w: [v.w, s.w].join(' '), v: v.v + s.v };
  }

HectoSimple
  = i:(RomanC? RomanC? RomanC?) {
    var w = [];
    var v = 0;
    for(var x=0; x < i.length; x++) {
  	  if(i[x]) {
    	w.push(i[x].w);
	    v += i[x].v;
      }
    }
    return { w: w.join(' '), v: v };
  }

Deca
  = DecaDeduct
  / DecaAdd
  / DecaSimple

DecaDeduct
  = i:RomanX j:(RomanC / RomanL) {
    return { w: [i.w, j.w].join(' '), v: i.v + j.v };
  }

DecaAdd
  = v:RomanL s:(DecaSimple) {
    return { w: [v.w, s.w].join(' '), v: v.v + s.v };
  }

DecaSimple
  = i:(RomanX? RomanX? RomanX?) {
    var w = [];
    var v = 0;
    for(var x=0; x < i.length; x++) {
  	  if(i[x]) {
    	w.push(i[x].w);
	    v += i[x].v;
      }
    }
    return { w: w.join(' '), v: v };
  }

One
  = OneDeduct
  / OneAdd
  / OneSimple

OneDeduct
  = i:RomanI j:(RomanX / RomanV) {
    return { w: [i.w, j.w].join(' '), v: i.v + j.v };
  }

OneAdd
  = v:RomanV s:(OneSimple) {
    return { w: [v.w, s.w].join(' '), v: v.v + s.v };
  }

OneSimple
  = i:(RomanI? RomanI? RomanI?) {
    var w = [];
    var v = 0;
    for(var x=0; x < i.length; x++) {
  	  if(i[x]) {
    	w.push(i[x].w);
	    v += i[x].v;
      }
    }
    return { w: w.join(' '), v: v };
  }

/**
 * START TEMPLATE
 **/

/**
 * Resource is the exhaustive regex for all resource candidates added
 * example: Resource = "Iron"i / "Dirt"i
 **/
Resource = "Silver"i / "Gold"i / "Credits"i / "Iron"i
  
/**
 * RNum is the definition for roman numerals
 **/
RomanM
  = Skip { return {w: '', v: 0}; }

RomanD
  = Skip { return {w: '', v: 0}; }

RomanC
  = Skip { return {w: '', v: 0}; }

RomanL
  = _ w:"tegj"i !char { return { w: w, v: 50 }; }

RomanX
  = _ w:"pish"i !char { return { w: w, v: 10 }; }

RomanV
  = _ w:"prok"i !char { return { w: w, v: 5 }; }

RomanI
  = _ w:"glob"i !char { return { w: w, v: 1 }; }

/**
 * Skip keyword is used since it should never match anything
 * PEGJS does not have the ability to set rules to never match
 * but will throw an error otherwise
 */
Skip
  = "+++++"

/**
 * END TEMPLATE
 **/

Integer "integer"
  = &([0-9]* !char) n:([0-9]*) { return {w: n, v: parseInt(n, 10)}; }

keywords
  = reserved
  / Skip

reserved
  = is
  / qns
  / how
  / many
  / much

how_much_is
  = how ws much ws is

how_many
  = how ws many

qns = "?"
is = "is"
how = "how"
many = "many"
much = "much"

char "character"
  = [a-zA-Z0-9]

ws "compulsory whitespace"
  = [ \t\n\r]+ { return null; }

_ "optional whitespace"
  = [ \t\n\r]* { return null; }