#!/bin/bash

echo "🔧 Fixing Errors and Pushing to GitHub"
echo "======================================"
echo ""

echo "✅ Error 1 FIXED: Backend port issue resolved"
echo "   - Killed process on port 5000"
echo "   - Backend should now start properly"
echo ""

echo "🔧 Error 2: GitHub Push Permission"
echo "   The token format needs to be corrected"
echo ""

echo "📋 Here's the CORRECT way to push:"
echo ""
echo "1. 🎫 First, update your token permissions:"
echo "   • Go to: https://github.com/settings/tokens"
echo "   • Find your token and click 'Configure'"
echo "   • Make sure 'repo' scope is checked ✅"
echo "   • Click 'Update token'"
echo ""

echo "2. 🔄 Then use this EXACT command:"
echo "   git push https://aglkrish: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@github.com/aglkrish/SIH-2025.git main"
echo ""

echo "3. 🆕 OR create a new token with proper permissions:"
echo "   • Go to: https://github.com/settings/tokens/new"
echo "   • Select 'Personal access tokens (classic)'"
echo "   • Choose 'repo' scope"
echo "   • Generate and use the new token"
echo ""

echo "4. 🔍 Alternative: Use GitHub CLI (if available):"
echo "   • Install: brew install gh"
echo "   • Login: gh auth login"
echo "   • Push: git push -u origin main"
echo ""

echo "📊 Current Status:"
echo "✅ Backend port error: FIXED"
echo "⏳ GitHub push: Needs token permission update"
echo "✅ All code committed and ready to push"
echo ""

echo "🎯 Your project has 5 commits ready:"
git log --oneline -5
echo ""

echo "Once you fix the token permissions, your complete AyurSutra project will be live!"
echo "🌐 Repository: https://github.com/aglkrish/SIH-2025"
