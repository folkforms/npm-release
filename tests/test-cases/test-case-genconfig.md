# Test case for 'genconfig' command

## Description

Test when we call 'genconfig' it executes the correct command.

## Input config

    hello
    world

## Input args

    genconfig

## Expected commands

    cp ./node_modules/@folkforms/npm-release/.npm-release-default-config.yml ./.npm-release.yml

## Expected echos

    Created file .npm-release.yml. You need to edit this file with your project details.
