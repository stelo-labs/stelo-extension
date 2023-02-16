#!/bin/sh

# Kill zombie processes

lsof -i tcp:3000 | awk 'NR!=1 {print $2}' | xargs kill
lsof -i tcp:3001 | awk 'NR!=1 {print $2}' | xargs kill 
lsof -i tcp:3003 | awk 'NR!=1 {print $2}' | xargs kill 
lsof -i tcp:3009 | awk 'NR!=1 {print $2}' | xargs kill 
lsof -i tcp:3011 | awk 'NR!=1 {print $2}' | xargs kill    
lsof -i tcp:4000 | awk 'NR!=1 {print $2}' | xargs kill
lsof -i tcp:8545 | awk 'NR!=1 {print $2}' | xargs kill  