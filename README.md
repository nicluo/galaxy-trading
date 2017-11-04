# Galaxy Merchant Trading Guide

A tegj tegj/tegj tegj solution to helping the intragalactic trader deal with numbers should be accurate, accessible, quick and easy to use.

## Starting the API Server (Koa)

Setting up the server:

    cd galaxy-api-parser
    yarn install
    yarn run start
    
Run tests:

    cd galaxy-api-parser
    yarn test
    
## Starting the client website (create-react-app)

Running the Browsersync proxy for development:

    cd galaxy-site
    yarn install
    yarn run start
    
Run tests:
        
    cd galaxy-site
    yarn test

## Todos:

-   Compute transitive closures for `resource_query`

## What's in the Parser?

### Parsing Expression Grammar

The types of queries available describe a formal language. There are four types of statements:

1.  Number definition - aliases a word to a roman numeral
2.  Resource definition - defines resource names and provides relative values
3.  Number query - converts aliased roman numerals to integer numbers
4.  Resource query - calculates the expected value of some resources when traded for another

There is one terminal rule for a valid statement.

    Expression
      = ResourceQuery
      / NumQuery
      / ResourceDef
      / RNumDef

This means that inputs to the parser must be one of these four types.


### Optional and mandatory whitespace

A lexer converts a sequence of characters into a sequence of tokens. Since we're parsing natural language sentences, the presence of whitespace becomes important.

How do you parse parse `tegj is L`? One might start with a whitespace rule that matches 0 or more spaces.

    _ "whitespace"
      = [ \t\n\r]*
      
    Expression
      = _ "tegj" _ "is" _ "L" _

This works, but the above rule also parses `tegjisL`. However, using compulsory whitespace is also tricky.
      
    ws "whitespace"
      = [ \t\n\r]+
      
    Expression
      = "tegj" ws "is" ws "L"
      
This rule will fail to match `<space>tegj is L<space>`. Since the grammar should be robust, this isn't a great solution. A combination of optional and mandatory whitespace is needed to express the grammar in a flexible yet correct manner.

    _ "optional whitespace"
      = [ \t\n\r]*
    
    ws "mandatory whitespace"
      = [ \t\n\r]+
      
    Expression
      = "_ tegj" ws "is" ws "L _"

This can be useful for some sentences where we can relax whitespace requirements.

    NumQuery = _ how_much_is ws r:RNum _ qns? _
    // Matches "how much is tegj"
               "how much is tegj?"
               "how much is tegj ?"
               " how much is tegj ? "

## Matching exact words

Predicates are needed to match an entire word and not just parts. For instance, the following will fail to parse `globglob globglob` correctly:

    RomanV
      = _ "glob"

    RomanI
      = _ "globglob"
      
    RNum
      = RomanV? RomanI? RomanI? RomanI?
      
This is because it checks that `globglob` matches the rule for `RomanV`. It will try to parse the remaining string `glob globglob` into `RomanI? RomanI? RomanI?` which fails.

Revising the rule to lookahead a character to ensure that the word is terminated clears that ambiguity.

    RomanV
      = _ "glob" ![a-z0-9]i

    RomanI
      = _ "globglob" ![a-z0-9]i
      
Parsing `globglob globglob` matches `RomanI RomanI` correctly.

Note that the `!` predicate doesn't actually consume the next character, so this allows mandatory whitespace to match something.
      
### Assumptions

1.   No whitespace between roman numeral aliases or resources. 

This may lead to ambiguous parse trees and would make the grammar a lot more complicated (with more lookaheads), or may require further pre/post-processing. 

